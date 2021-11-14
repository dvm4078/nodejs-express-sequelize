import fs from 'fs';
import path from 'path';

import config from '../config/config.js';

const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
);

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.split('.').length < 3 &&
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync().then(function () {
  console.log('Everything is synced');
});

export default db;
