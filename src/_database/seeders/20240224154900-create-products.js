'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Hollow Knight',
        description:
          'Hollow Knight is a classically styled 2D action adventure across a vast interconnected world',
        price: 14.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dark Souls: Remastered',
        description:
          'Then, there was fire. Re-experience the critically acclaimed, genre-defining game that started it all',
        price: 39.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Resident Evil 4',
        description:
          'In resident evil 4, special agent Leon S. Kennedy is sent on a mission to rescue the U.S. Presidents dauther who has been kidnapped',
        price: 19.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete('Products', null, {});
  },
};
