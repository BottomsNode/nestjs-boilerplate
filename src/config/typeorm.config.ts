import { DataSource } from 'typeorm';
import { configVariables } from '@shared';
export const AppDataSource = new DataSource({
  type: configVariables.database.type,
  host: configVariables.database.host,
  port: configVariables.database.port,
  username: configVariables.database.username,
  password: configVariables.database.password,
  database: configVariables.database.name,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  migrationsRun: false,
  logging: configVariables.nodeEnv === 'development',
});
