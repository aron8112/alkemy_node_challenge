'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId' });
      Movie.hasMany(models.Character)
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      release: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      genreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Movie',
      timestamps: true,
    },
  );
  return Movie;
};
