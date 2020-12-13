import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { UserService } from './auth/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async getInfo(): Promise<any> {
    const name = this.configService.get<string>('APP_NAME');
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    this.logger.debug(`DB_URL: ${databaseUrl}`);
    return {
      port: this.configService.get<string>('PORT'),
      name,
    };
  }
}
