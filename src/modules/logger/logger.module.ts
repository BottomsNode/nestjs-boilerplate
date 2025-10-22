import { Global, Module } from '@nestjs/common';
import { configVariables } from '@shared';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: configVariables.logger.level,
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
        autoLogging: false,
      },
      // Add this to prevent wildcard route registration
      forRoutes: [],
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
