import {
  ObjectType,
  HideField, Field,
} from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  email: string;
  @Field(() => String)
  firstName?: string;
  @Field(() => String)
  lastName?: string;
  @Field(() => String)
  accountType?: string;
  @HideField()
  password: string;
  @HideField()
  token: string;
}
