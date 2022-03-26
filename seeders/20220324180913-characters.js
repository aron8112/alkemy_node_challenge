'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Characters',
      [
        {
          id: 1,
          image: './images/Jtts.jpg ',
          name: 'Jack Torrance',
          weight: 92,
          age: 44,
          history: 'A mad man in a mad hotel',
          createdAt: new Date,
          updatedAt: new Date,
          movieId: 1,
        },
        {
          id: 2,
          image: './image/Wtts.jpg ',
          name: 'Wendy Torrance',
          weight: 70,
          age: 35,
          history: "Jack Torrance's wife",
          createdAt: new Date,
          updatedAt: new Date,
          movieId: 1,
        },
        {
          id: 3,
          image: './image/dtds.jpg',
          name: 'Danny Torrance',
          weight: 85,
          age: 40,
          history: 'The son of Jack and Wendy Torrance',
          createdAt: new Date,
          updatedAt: new Date,
          movieId: 4,
        },
        {
          id: 4,
          image: './image/Simba.jpg ',
          name: 'Simba',
          weight: 120,
          age: 4,
          history:
          'The future king of the lions pack, friend of Timon and Pumba',
          createdAt: new Date,
          updatedAt: new Date,
          movieId: 2,
        },
        {
          id: 5,
          image: './image/Timon.jpg',
          name: 'Timon',
          weight: 5,
          age: 7,
          history: 'A crazy suricat, friend of Pumba and Simba',
          createdAt: new Date,
          updatedAt: new Date,
          movieId:2,
        },
        {
          id: 6,
          image: './image/Pumba.bmp',
          name: 'Pumba',
          weight: 60,
          age: 6,
          history: 'An african wild boar, friend od Timon and Simba',
          createdAt: new Date,
          updatedAt: new Date,
          movieId:3
        },
        {
          id: 7,
          image: './image/Batman.jpeg',
          name: 'Batman',
          weight: 95,
          age:38,
          history: 'A multimillonaire fighting the crime in Gotham City',
          createdAt: new Date,
          updatedAt: new Date,
          movieId:5
        },
        {
          id: 8,
          image: './image/Superman.jpeg',
          name: 'Superman',
          weight: 200,
          age:37,
          history: 'An alien born in Krypton',
          createdAt: new Date,
          updatedAt: new Date,
          movieId:5
        },
        {
          id: 9,
          image: './image/WonderWomanJL.jpeg',
          name: 'Wonder Woman',
          weight: 80,
          age:120,
          history: 'An exiled amazonian warrior',
          createdAt: new Date,
          updatedAt: new Date,
          movieId:5
        },
      ],
      {},
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Characters', null, {});
  },
};
