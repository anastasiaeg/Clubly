'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clubs = sequelize.define('Clubs', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    webpage: DataTypes.TEXT,
    email: DataTypes.TEXT,
    socialMedia: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  Clubs.associate = (models) => {
    Clubs.belongsToMany(models.Tags, {
      through: 'ClubsTags',
      as: 'tags',
      foreignKey: 'clubId',
      onDelete: 'CASCADE'
    });
    Clubs.belongsToMany(models.Events, {
      through: 'ClubsEvents',
      as: 'events',
      foreignKey: 'clubId',
      otherKey: 'eventId',
      onDelete: 'CASCADE'
    });
    Clubs.belongsToMany(models.Users, {
      through: 'ClubsUsers',
      as: 'members',
      foreignKey: 'clubId',
      otherKey: 'userId',
      onDelete: 'CASCADE'
    });
    Clubs.belongsToMany(models.Users, {
      through: 'ClubsUsers',
      as: 'organizers',
      foreignKey: 'clubId',
      otherKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Clubs;
};