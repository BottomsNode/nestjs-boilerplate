import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { EHealthCheck } from '../enum';

export class HealthComponentStatusDto {
  @ApiProperty({ description: 'Status of the component', enum: EHealthCheck })
  @AutoMap()
  status: EHealthCheck;
}

export class HealthResponseDto {
  @ApiProperty({ description: 'Overall system status', enum: EHealthCheck })
  @AutoMap()
  status: EHealthCheck;

  @ApiProperty({ description: 'Timestamp of the health check' })
  @AutoMap()
  timestamp: string;

  @ApiProperty({
    description: 'Status of individual components',
    type: 'object',
    additionalProperties: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: Object.values(EHealthCheck) },
      },
    },
    example: {
      database: { status: 'UP' },
      cpu: { status: 'DOWN' },
      memory: { status: 'UP' },
    },
  })
  @AutoMap({ type: () => HealthComponentStatusDto })
  components: Record<string, HealthComponentStatusDto>;
}
