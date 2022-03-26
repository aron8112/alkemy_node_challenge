'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Genres',
      [
        {
          id: 1,
          name: 'Thriller',
          image: './image/thriller.jpg',
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 2,
          name: 'Animation',
          image: './image/animation.jpg',
          createdAt: new Date,
          updatedAt: new Date,
        },
        {
          id: 3,
          name: 'Superheroes',
          image: './image/superheroes.jpg',
          createdAt: new Date,
          updatedAt: new Date,
        },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Genres', null, {});
  },
};
