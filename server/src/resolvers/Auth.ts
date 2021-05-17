import { User } from '../entity/User';
import { Query, Resolver } from 'type-graphql';

@Resolver(User)
export class Auth {
  @Query(() => String)
  test() {
    return 'loca';
  }
}
