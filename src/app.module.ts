import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from '@config/database-connect.msg';
import { AppDataSource } from '@config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AutomapperModule,

    // TODO :  For File Upload if needed uncomment  this    
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    //   serveRoot: '/uploads',
    // }),
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
