'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define('Admins', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    employeeId: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT
  }, {});
  Admins.associate = function (models) {
    // associations can be defined here
  };
  return Admins;
};