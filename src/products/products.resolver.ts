import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export  class ProductsResolver {
  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
