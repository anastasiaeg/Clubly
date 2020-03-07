'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    year: DataTypes.TEXT,
    studentId: DataTypes.TEXT,
    major: DataTypes.TEXT,
    email: {
      type: DataTypes.TEXT,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    image: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    password: DataTypes.TEXT,
    confirmHash: DataTypes.TEXT
  }, {});
  Users.associate = (models) => {
    Users.belongsToMany(models.Tags, {
      through: 'TagsUsers',
      as: 'tags',
      foreignKey: 'userId',
      otherKey: 'tagId',
      onDelete: 'CASCADE'
    });
    Users.belongsToMany(models.Clubs, {
      through: 'ClubsUsers',
      as: 'memberOf',
      foreignKey: 'userId',
      otherKey: 'clubId',
      onDelete: 'CASCADE'
    });
    Users.belongsToMany(models.Clubs, {
      through: 'ClubsUsers',
      as: 'organizerOf',
      foreignKey: 'userId',
      otherKey: 'clubId',
      onDelete: 'CASCADE'
    });
    Users.belongsToMany(models.Events, {
      through: 'EventsUsers',
      as: 'events',
      foreignKey: 'userId',
      otherKey: 'eventId',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};