const { Client } = require('pg');
const path = require('path');

const client = new Client({
  user: 'jaybee',
  host: 'localhost',
  database: 'rewards',
  password: 'admin',
  port: 5432,
});

const rewards = path.join(__dirname, '..', '..', 'rewards.csv');

async function connection() {
  await client.connect();
  await client.query('DROP TABLE IF EXISTS rewards;');
  await client.query('CREATE TABLE IF NOT EXISTS rewards (id SERIAL PRIMARY KEY, idTier TEXT, projectId INT, pledgeAmount INT, name TEXT, description TEXT, item1 TEXT, item2 TEXT, item3 TEXT, isLimited BOOLEAN, limitCount TEXT, estDeliv TEXT, shipsTo TEXT, backers INT);');
  await client.query(`COPY rewards (idTier, projectId, pledgeAmount, name, description, item1, item2, item3, isLimited, limitCount, estDeliv, shipsTo, backers) from '${rewards}' CSV HEADER;`);
  await client.end();
}

connection();
