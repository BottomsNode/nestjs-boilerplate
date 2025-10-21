import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import si from 'systeminformation';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { HealthComponentStatusDto, HealthResponseDto } from './model';
import { EHealthCheck } from './enum';

@Injectable()
export class HealthService {
    constructor(
        private readonly logger: PinoLogger,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {
        this.logger.setContext(HealthService.name);
    }

    async check(): Promise<HealthResponseDto> {
        const timestamp = new Date().toISOString();
        const components: Record<string, HealthComponentStatusDto> = {};

        try {
            // Database health
            try {
                await this.dataSource.query('SELECT 1');
                components.database = { status: EHealthCheck.UP };
            } catch {
                components.database = { status: EHealthCheck.DOWN };
            }

            // CPU health
            try {
                const cpuLoad = await si.currentLoad();
                components.cpu = { status: cpuLoad.currentLoad < 90 ? EHealthCheck.UP : EHealthCheck.DOWN };
            } catch {
                components.cpu = { status: EHealthCheck.DOWN };
            }

            // Memory health
            try {
                const mem = await si.mem();
                components.memory = { status: mem.free > 100 * 1024 * 1024 ? EHealthCheck.UP : EHealthCheck.DOWN };
            } catch {
                components.memory = { status: EHealthCheck.DOWN };
            }

            const status = Object.values(components).some(c => c.status === EHealthCheck.DOWN)
                ? EHealthCheck.DOWN
                : EHealthCheck.UP;

            this.logger.info('Health check performed', { status, components });

            return { status, timestamp, components };

        } catch (error) {
            this.logger.error('Health check failed', { error });

            // Ensure all components are set to DOWN
            Object.keys(components).forEach(key => {
                if (!components[key]) components[key] = { status: EHealthCheck.DOWN };
            });

            return { status: EHealthCheck.DOWN, timestamp, components };
        }
    }
}
