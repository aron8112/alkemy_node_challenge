'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Movies', 'genreId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Genres',
        key: 'id',
      },
      allowNull: true,
      defaultValue: null,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Movies', 'genreId');
  },
};
