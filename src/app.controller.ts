import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): any {
    // pass message
    this.logger.log('getHello()');

    // also we can pass context
    this.logger.log('getHello()', AppController.name);

    const name = this.configService.get<string>('APP_NAME');
    const db1 = this.configService.get<string>('DATABASE_PASSWORD');

    return {
      port: this.configService.get<string>('http.port'),
      name,
      db1,
    };
  }
}
