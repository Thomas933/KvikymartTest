import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import * as winston from 'winston';
import { Product } from '../entity/Product';
import { ProductService } from './product.service';
import { ProductInput, Availability } from './product.input';
import { ProductOutput } from './product.output';
import { ProductEditInput } from './product-edit.input';
import { Lang } from '../productTranslation/productTrasnlation.input';

@Resolver('Product')
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(returns => [Product])
  async products(@Args('lang') lang: Lang, @Args('availability') availability: Availability) {
    try {
      return this.productService.getProducts(lang, availability);
    } catch (e) {
      winston.error(e.message);
    }
  }

  @Query(returns => Product)
  async product(@Args('id') id: number, @Args('lang') lang: Lang) {
    try {
      return this.productService.getProduct(id, lang);
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
    try {
    return this.productService.createProduct(inputProduct);
    } catch (e) {
      winston.error(e.message);
    }
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
