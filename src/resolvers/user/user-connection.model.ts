import { ObjectType } from '@nestjs/graphql';
import { User } from '../../models/user.model';
import { Paginated } from '../../common/pagination/paginations';

@ObjectType()
export class UserConnection extends Paginated<User>(User) {}
