import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import * as Joi from '@hapi/joi';
import { LoggerModule } from 'nestjs-pino';
import { UserService } from './auth/user/user.service';
import { PrismaService } from './prisma.service';
import { UserController } from './auth/user/user.controller';

const environment = process.env.NODE_ENV || 'local';

@Module({
  imports: [
    // https://github.com/iamolegga/nestjs-pino#asynchronous-configuration
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        autoLogging: false,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [`.${environment}.env`, '.env'],
      load: [configuration],
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'local')
          .default('development'),
        PORT: Joi.number().default(3000),
        APP_NAME: Joi.string().default('NestJs App'),
        DATABASE_URL: Joi.string(),
      }),
    }),
  ],
  controllers: [AppController, UserController],
  providers: [PrismaService, UserService],
})
export class AppModule {}
