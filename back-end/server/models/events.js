'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    location: DataTypes.TEXT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    image: DataTypes.TEXT,
    attendanceCode: {
      type: DataTypes.TEXT,
      default: ""
    }
  }, {});
  Events.associate = (models) => {
    Events.belongsToMany(models.Tags, {
      through: 'EventsTags',
      as: 'tags',
      foreignKey: 'eventId',
      otherKey: 'tagId',
      onDelete: 'CASCADE'
    });
    Events.belongsToMany(models.Clubs, {
      through: 'ClubsEvents',
      as: 'clubs',
      foreignKey: 'eventId',
      otherKey: 'clubId',
      onDelete: 'CASCADE'
    });
    Events.belongsToMany(models.Users, {
      through: 'EventsUsers',
      as: 'users',
      foreignKey: 'eventId',
      otherKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Events;
};