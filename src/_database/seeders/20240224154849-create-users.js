'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: '12345678',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'UserOne',
        email: 'userone@gmail.com',
        password: '12345678',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'UserTwo',
        email: 'usertwo@gmail.com',
        password: '12345678',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    queryInterface.bulkDelete('Users', null, {});
  },
};
