'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Bruno_Doe',
          email: 'bruno@doe.com',
          password: '123456789',
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          username: 'Emre_Smith',
          email: 'emre@smith.com',
          password: '123456789',
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          username: 'John_Stone',
          email: 'john@stone.com',
          password: '123456789',
          createdAt: new Date,
          updatedAt: new Date,
        },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
