const { __prod__ } = require('./build/constants');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: __prod__ ? false : true,
  logging: __prod__ ? false : true,
  entities: ['build/entity/**/*.js'],
  migrations: ['build/migration/**/*.js'],
  subscribers: ['build/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
