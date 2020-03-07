'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClubsEvents = sequelize.define('ClubsEvents', {
    clubId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clubs',
        key: 'id'
      },
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: 'Events',
      referencesKey: 'id',
      allowNull: false
    }
  }, {});
  return ClubsEvents;
};