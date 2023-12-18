
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  // port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  // host: process.env.DATABASE_HOST || 'localhost',
  host: "mysql",
  port: 3307,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || 'Nguyenhuuthanga3@',
  database: process.env.DATABASE_NAME || 'book_store',
  entities: [__dirname + '/../**/**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);