import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product } from '../entity/Product';
import { Translation } from '../entity/Translation';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Translation])],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
