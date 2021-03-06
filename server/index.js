// require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/index.js');
const fs = require('fs');

const app = express();
const port = 80;
// const host = 'localhost' || '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());
app.use('/:projectId', express.static('public'));

app.get('/loaderio-', (req, res) => {
  fs.writeFile('.txt', '', (err) => {
    if (err) throw err;
    res.sendFile(__dirname + '.txt', err => {
      if (err) throw err;
    });
  });
});

app.get('/api/:projectId/rewards', (req, res) => {
  const { projectId } = req.params;

  db.db.query('SELECT * FROM rewards where projectid = ?',
    { raw: true, replacements: [projectId], model: db.Reward, order: ['pledgeamount', 'ASC'] })
    .then((rewards) => {
      res.send(rewards);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/:projectId/currency', (req, res) => {
  const { projectId } = req.params;

  db.db.query('SELECT * FROM projects where id = ?',
    { raw: true, replacements: [projectId], model: db.Project })
    .then((project) => {
      const currencyMap = {
        CA: 'C$',
        UK: '£',
        US: 'US$',
        AU: 'A$',
        NZ: 'NZ$',
        NL: '€',
        DK: 'kr.',
        IE: '€',
        NO: 'kr',
        SE: 'kr',
        DE: '€',
        FR: '€',
        ES: '€',
        IT: '€',
        AT: '€',
        BE: '€',
        CH: 'Fr.',
        LU: '€',
        HK: 'HK$',
        SG: 'S$',
        MX: 'Mex$',
        JP: '¥',
      };
      const result = currencyMap[project[0].location];
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/:projectId/rewards', (req, res) => {
  const { projectId } = req.params;
  const { pledgeAmount, name, description, item1, item2, item3, isLimited, limitCount, estDeliv, shipsTo, backers } = req.body;

  db.db.query('INSERT INTO rewards (projectId, pledgeAmount, name, description, item1, item2, item3, isLimited, limitCount, estDeliv, shipsTo, backers) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', { raw: true, replacements: [projectId, pledgeAmount, name, description, item1, item2, item3, isLimited, limitCount, estDeliv, shipsTo, backers], model: db.Reward })
    .then(() => {
      res.send('posted new reward');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/api/:projectId/:name/pledge', (req, res) => {
  const { projectId, name } = req.params;

  db.db.query('SELECT * FROM rewards where projectid = ? and name = ?',
    { raw: true, replacements: [projectId, name], model: db.Reward })
    .then((reward) => {
      if (reward[0].backers < parseInt(reward[0].limitcount) || reward[0].limitcount === null) {
        db.db.query('UPDATE rewards SET backers = backers + 1 where projectid = ? and name = ?', { raw: true, replacements: [projectId, name], model: db.Reward });
      }
    })
    .then(() => {
      res.sendStatus(201).end();
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put('/api/:projectId/:name/rewards', (req, res) => {
  const { projectId, name } = req.params;
  const { pledgeAmount, description, item1, item2, item3, isLimited, limitCount, estDeliv, shipsTo, backers } = req.body;
  const query = `UPDATE rewards SET (projectId, pledgeAmount, name, description, item1, item2, item3, isLimited, limitCount, 
  estDeliv, shipsTo, backers) = (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) where projectid = ? and name = ?;`;
  const replace = [projectId, pledgeAmount, name, description, item1, item2, item3, isLimited, limitCount, estDeliv, shipsTo, backers, projectId, name];

  db.db.query(query, { raw: true, replacements: replace, model: db.Reward })
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete('/api/:projectId/:name/rewards', (req, res) => {
  const { projectId, name } = req.params;

  db.db.query('DELETE FROM rewards where projectid = ? and name = ?', { raw: true, replacements: [projectId, name] })
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => console.log(`Server is listening at port ${port}`));
