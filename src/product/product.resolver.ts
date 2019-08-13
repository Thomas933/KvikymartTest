import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import * as winston from 'winston';
import { Product } from '../entity/Product';
import { ProductService } from './product.service';
import { ProductInput } from './product.input';
import { ProductOutput } from './product.output';
import { ProductEditInput } from './product-edit.input';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(returns => [Product])
  async products() {
    try {
      return this.productService.getProducts();
    } catch (e) {
      winston.error(e.message);
    }
  }

  @Query(returns => Product)
  async product(@Args('id') id: number) {
    try {
      return this.productService.getProduct(id);
    } catch (e) {
      winston.error(e.message);
    }
  }

  @Query(returns => Boolean)
  async deleteProduct(@Args('id') id: number) {
    try {
      return this.productService.deleteProduct(id);
    } catch (e) {
      winston.error(e.message);
    }
  }

  @Mutation(returns => ProductOutput)
  async createProduct(@Args('inputProduct') inputProduct: ProductInput) {
    return this.productService.createProduct(inputProduct);
  }

  @Mutation(returns => Product)
  async updateProduct(@Args('input') input: ProductEditInput) {
    try {
      return this.productService.updateProduct(input);
    } catch (e) {
      winston.error(e.message);
    }
  }
}
