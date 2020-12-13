import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Logger } from 'nestjs-pino';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async getUsers() {
    const users = await this.userService.users({});
    return users.map((u) => {
      const user = { ...u };
      delete user.password;
      delete user.token;
      return user;
    });
  }
}
