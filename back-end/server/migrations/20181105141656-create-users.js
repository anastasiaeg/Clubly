'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.TEXT
      },
      lastName: {
        type: Sequelize.TEXT
      },
      year: {
        type: Sequelize.TEXT
      },
      studentId: {
        type: Sequelize.TEXT
      },
      major: {
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.TEXT,
        validate: {
          isEmail: true,
        }
      },
      image: {
        type: Sequelize.TEXT
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      active: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      confirmHash: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};