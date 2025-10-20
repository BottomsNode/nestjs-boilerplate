import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { API_VERSION, GlobalExceptionsFilter, PORT, SWAGGER_DOCS } from '@shared';

async function bootstrap() {
  // Create app with buffered logs
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Set global API prefix (versioning)`
  app.setGlobalPrefix(`api/${API_VERSION}`);

  // Swagger setup
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(SWAGGER_DOCS, app, swaggerDocument);

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionsFilter());

  // Start server
  await app.listen(PORT);

  const host = `http://localhost:${PORT}`;
  console.log(`Application running at: ${host}/api/${API_VERSION}`);
  console.log(`Swagger docs available at: ${host}/${SWAGGER_DOCS}`);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting application:', error);
});
