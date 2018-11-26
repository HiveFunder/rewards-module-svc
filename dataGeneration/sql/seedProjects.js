const { Client } = require('pg');
const path = require('path');

const client = new Client({
  user: 'jaybee',
  host: 'localhost',
  database: 'rewards',
  password: 'admin',
  port: 5432,
});

const projects = path.join(__dirname, '..', '..', 'projects.csv');

async function connection() {
  await client.connect();
  // await client.query('DROP DATABASE rewards;');
  // await client.query('CREATE DATABASE rewards;');
  // await client.query('\connect rewards;');
  await client.query('DROP TABLE IF EXISTS projects;');
  await client.query('CREATE TABLE IF NOT EXISTS projects (id INT PRIMARY KEY, location TEXT);');
  await client.query(`COPY projects (id, location) from '${projects}' CSV HEADER;`);
  await client.end();
}

connection();
