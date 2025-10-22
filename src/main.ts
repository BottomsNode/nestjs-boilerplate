import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { configVariables, GlobalExceptionsFilter } from '@shared';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get<Logger>(Logger);
  app.useLogger(logger);

  app.enableCors();

  app.setGlobalPrefix(`api/v${configVariables.api.version}`);

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(configVariables.swagger.docs, app, swaggerDocument);

  app.useGlobalFilters(new GlobalExceptionsFilter());

  app.enableShutdownHooks();

  await app.listen(configVariables.port);

  const host = `http://localhost:${configVariables.port}`;
  logger.log(
    `Application running at: ${host}/api/v${configVariables.api.version}`,
  );
  logger.log(
    `Swagger docs available at: ${host}/${configVariables.swagger.docs}`,
  );
}

bootstrap().catch((error) => {
  console.error('❌ Error starting application:', error);
  process.exit(1);
});
