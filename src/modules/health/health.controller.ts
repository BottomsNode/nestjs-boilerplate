import { Controller, Get, Version } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthResponseDto } from './model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    @ApiOperation({ summary: 'Check application and system health' })
    @ApiResponse({ status: 200, description: 'Health check result', type: HealthResponseDto })
    async checkHealth(): Promise<HealthResponseDto> {
        return this.healthService.check();
    }
}
