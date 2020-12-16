import { Args, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/models/user.model';
import { PrismaService } from '../../prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination.args';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { UserConnection } from './user-connection.model';

@ObjectType()
export class UserResult {
  @Field((type) => [User])
  results: User[];
  totalCount: Number;
}

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => UserResult)
  async users(
    @Args() { skip, take }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
  ) {
    const users = await this.prisma.user.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id: 'asc',
      },
    });
    const totalCount = await this.prisma.user.count();

    const results = new UserResult();
    results.results = users;
    results.totalCount = totalCount;

    return results;
  }
}
