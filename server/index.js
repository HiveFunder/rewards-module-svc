const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/index.js');

const app = express();
const port = 3003;
const host = 'localhost' || '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());
app.use('/:projectId', express.static('public'));

app.get('/api/:projectId/rewards', (req, res) => {
  const { projectId } = req.params;

  db.Reward.findAll({
    where: {
      projectId,
    },
    order: [
      ['pledgeAmount', 'ASC'],
    ],
  })
    .then((rewards) => {
      const results = rewards.map(reward => (reward.dataValues));
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/:projectId/currency', (req, res) => {
  const { projectId } = req.params;

  db.Project.findAll({
    where: {
      id: projectId,
    },
  })
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
      const result = currencyMap[project[0].dataValues.location];
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/:projectId/rewards', (req, res) => {
  const { projectId } = req.params;
  req.body.projectId = projectId;

  db.Reward.create(req.body)
    .then(() => {
      res.send('posted new reward');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/api/:projectId/pledge', (req, res) => {
  db.Pledge.create(req.body)
    .then(() => {
      res.send('thanks for the pledge');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put('/api/:projectId/:name/rewards', (req, res) => {
  const { projectId, name } = req.params;
  req.body.projectId = projectId;

  db.Reward.update(req.body, { where: { projectId, name } })
    .then(() => db.Reward.findAll({
      where: {
        projectId,
      },
      order: [
        ['pledgeAmount', 'ASC'],
      ],
    }))
    .then((rewards) => {
      const results = rewards.map(reward => (reward.dataValues));
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete('/api/:projectId/rewards', (req, res) => {
  const { projectId } = req.params;

  db.Reward.destroy({
    where: {
      projectId,
    },
  })
    .then(() => {
      res.send('deleted');
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, host);
console.log(`Server is listening at port ${port}`);
