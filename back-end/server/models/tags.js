'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    name: DataTypes.TEXT,
  }, {});
  Tags.associate = (models) => {
    Tags.belongsToMany(models.Users, {
      through: 'TagsUsers',
      as: 'users',
      foreignKey: 'tagId',
      otherKey: 'userId',
      onDelete: 'CASCADE'
    });
    Tags.belongsToMany(models.Clubs, {
      through: 'ClubsTags',
      as: 'clubs',
      foreignKey: 'tagId',
      otherKey: 'clubId',
      onDelete: 'CASCADE'
    });
    Tags.belongsToMany(models.Events, {
      through: 'EventsTags',
      as: 'events',
      foreignKey: 'tagId',
      otherKey: 'eventId',
      onDelete: 'CASCADE'
    });
  };
  return Tags;
};