import { DocumentBuilder } from '@nestjs/swagger';
import { configVariables } from '@shared';

export const swaggerConfig = new DocumentBuilder()
  .setTitle(`${configVariables.database.name} API Documentation`)
  .setDescription(
    `${configVariables.database.name} Swagger For API Documentation`,
  )
  .setVersion(configVariables.api.version)
  .addServer(
    `http://localhost:${configVariables.port}/`,
    `${configVariables.database.name} Local environment`,
  )
  .addTag(`List of ${configVariables.database.name} API's`)
  .addBearerAuth()
  .build();
