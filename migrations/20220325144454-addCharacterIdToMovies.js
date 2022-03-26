'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Characters','movieId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Movies',
        key: 'id'
      },
      allowNull: true,
      defaultValue: null
    }
    )},
  
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Characters', 'movieId');
  }
};
