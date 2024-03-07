'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password:
          '$2b$10$Yjvs2eJ0O2Dt.V6HW6gMc.dkycZ8iWKvSgYlpTuwrFQSKidOqBJ5m',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'UserOne',
        email: 'userone@gmail.com',
        password:
          '$2b$10$Yjvs2eJ0O2Dt.V6HW6gMc.dkycZ8iWKvSgYlpTuwrFQSKidOqBJ5m',
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'UserTwo',
        email: 'usertwo@gmail.com',
        password:
          '$2b$10$Yjvs2eJ0O2Dt.V6HW6gMc.dkycZ8iWKvSgYlpTuwrFQSKidOqBJ5m',
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
