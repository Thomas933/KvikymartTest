import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import * as winston from 'winston';
import { Product } from '../entity/Product';
import { ProductService } from './product.service';
import { ProductInput } from './product.input';
import { ProductOutput } from './product.output';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(returns => [Product])
  async products() {
    try {
      return this.productService.getAll();
    } catch (e) {
      winston.error(e.message);
    }
  }

  @Query(returns => Product)
  async product(@Args('id') id: number) {
    try {
      return this.productService.get(id);
    } catch (e) {
      winston.error(e.message);
    }
  }

  @Mutation(returns => ProductOutput)
  async createProduct(@Args('input') input: ProductInput) {
    try {
      await this.productService.create(input);
    } catch (e) {
      winston.error(e.message);
    }
  }
}
