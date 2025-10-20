import { DocumentBuilder } from '@nestjs/swagger';
import { DB_NAME, PORT } from '@shared';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Nest BoilerPlate API Documentation')
  .setDescription('Nest BoilerPlate Swagger For API Documentation')
  .setVersion('1.0')
  .addServer(`http://localhost:${PORT}/`, `${DB_NAME} Local environment`)
  .addTag(`List of ${DB_NAME} API's`)
  .addBearerAuth()
  .build();
