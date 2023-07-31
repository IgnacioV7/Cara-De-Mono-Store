import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { enviroments } from '../enviroment';

dotenv.config({
  path: enviroments[process.env.NODE_ENV] || '.env',
});

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

export default PostgresDataSource;
