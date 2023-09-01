const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

if (fs.existsSync('.env')) {
  dotenv.config();
}

module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [
    path.join(__dirname, 'src/modules/**/entities/*.entity{.ts,.js}')
  ],
  migrations: [
    path.join(__dirname, 'src/modules/**/migrations/*{.ts,.js}')
  ],
  cli: {
    entitiesDir: 'src/modules/**/entities',
    migrationsDir: 'src/modules/**/migrations'
  }
};
