let models = require("./server/models");

let { sequelize } = models;

sequelize.sync();
