'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClubsTags = sequelize.define('ClubsTags', {
    clubId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clubs',
        key: 'id'
      },
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tags',
        key: 'id'
      },
      allowNull: false
    }
  }, {});
  return ClubsTags;
};