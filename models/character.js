'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      Character.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        });
    }
  }
  Character.init(
    {
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      history: DataTypes.STRING,
      movieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Character',
      timestamps: true,
    },
  );
  return Character;
};
