'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagsUsers = sequelize.define('TagsUsers', {
    tagId: {
      type: DataTypes.INTEGER,
      references: 'Tags',
      referencesKey: 'id',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
      allowNull: false
    }
  }, {});
  return TagsUsers;
};