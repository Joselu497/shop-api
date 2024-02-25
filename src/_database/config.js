/* eslint-disable prettier/prettier */
module.exports = {
    development: {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'db_shop_dev',
      username: 'postgres',
      password: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    },
    test: {
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'db_shop_dev',
      username: 'postgres',
      password: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    },
    production: {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    },
  };
  