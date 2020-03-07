'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClubsUsers = sequelize.define('ClubsUsers', {
    isOrganizer: DataTypes.BOOLEAN,
    clubId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clubs',
        key: 'id'
      },
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    }
  }, {});
  return ClubsUsers;
};