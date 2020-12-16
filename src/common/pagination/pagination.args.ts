import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Number)
  skip?: number;
  @Field(() => Number)
  take?: number;
}
