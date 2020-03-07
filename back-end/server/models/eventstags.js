'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventsTags = sequelize.define('EventsTags', {
    eventId: {
      type: DataTypes.INTEGER,
      references: 'Events',
      referencesKey: 'id',
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: 'Tags',
      referencesKey: 'id',
      allowNull: false
    }
  }, {});
  return EventsTags;
};