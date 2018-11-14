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
  res.end();
});

app.put('/api/:projectId/rewards', (req, res) => {
  res.end();
});

app.listen(port, host);
console.log(`Server is listening at port ${port}`);
