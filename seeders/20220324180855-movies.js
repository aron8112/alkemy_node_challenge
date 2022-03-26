'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Movies',
      [
        {
          id: 1,
          image: './image/poster1.jpg',
          title: 'The Shinning',
          release: '1980/12/25',
          rate: 5,
          createdAt: new Date,
          updatedAt: new Date,
          genreId: 1,
        },
        {
          id: 2,
          image: './image/poster2.jpg',
          title: 'The Lion King',
          release: '1994/01/31',
          rate: 5,
          createdAt: new Date,
          updatedAt: new Date,
          genreId: 2,
        },
        {
          id: 3,
          image: './image/poster3.jpg',
          title: 'The Lion King 2',
          release: '2000/02/01',
          rate: 3,
          createdAt: new Date,
          updatedAt: new Date,
          genreId: 2,
        },
        {
          id: 4,
          image: './image/poster/poster4',
          title: 'Doctor Sleep',
          release: '2020/05/14',
          rate: 2,
          createdAt: new Date,
          updatedAt: new Date,
          genreId: 1,
        },
        {
          id: 5,
          image: './image/poster/poster5',
          title: 'Batman vs Superman',
          release: '2018/07/16',
          rate: 1,
          createdAt: new Date,
          updatedAt: new Date,
          genreId: 3,
        },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
