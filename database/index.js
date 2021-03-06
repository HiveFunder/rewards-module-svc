const Sequelize = require('sequelize');

// const db = new Sequelize('rewards', 'root', '', {
//   dialect: 'postgres',
//   host: 'localhost',
//   operatorsAliases: false,
// });

const db = new Sequelize('postgres://postgres@ec2-34-213-163-161.us-west-2.compute.amazonaws.com/rewards');

const Reward = db.define('Reward', {
  idTier: Sequelize.STRING,
  projectId: Sequelize.INTEGER,
  pledgeAmount: Sequelize.INTEGER,
  name: Sequelize.STRING,
  description: Sequelize.STRING(500),
  item1: Sequelize.STRING,
  item2: Sequelize.STRING,
  item3: Sequelize.STRING,
  isLimited: Sequelize.BOOLEAN,
  limitCount: Sequelize.INTEGER,
  estDeliv: Sequelize.STRING,
  shipsTo: Sequelize.STRING,
  backers: Sequelize.INTEGER,
});

const Project = db.define('Project', {
  location: Sequelize.STRING,
});

// Reward.sync();
// Project.sync();

exports.db = db;
exports.Reward = Reward;
exports.Project = Project;
