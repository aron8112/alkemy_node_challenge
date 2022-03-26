'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Characters', 'weight', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Characters', 'weight');
  },
};