'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {}

  Genre.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Genre',
      timestamps: true,
    },
  );
  return Genre;
};
