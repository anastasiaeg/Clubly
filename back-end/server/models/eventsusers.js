'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventsUsers = sequelize.define('EventsUsers', {
    eventId: {
      type: DataTypes.INTEGER,
      references: 'Events',
      referencesKey: 'id',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
      allowNull: false
    },
    attended: DataTypes.BOOLEAN,
    rsvp: DataTypes.BOOLEAN
  }, {});
  return EventsUsers;
};