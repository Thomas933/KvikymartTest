import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, getConnectionManager } from 'typeorm';
import { Product } from '../entity/Product';
import { ProductInput } from './product.input';
import { Translation } from '../entity/Translation';
import { DEFAULT_CONNECTION_NAME } from '@nestjs/typeorm/dist/typeorm.constants';
import { ProductOutput } from './product.output';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
    @InjectEntityManager()
    private connectionManager = getConnectionManager().get(DEFAULT_CONNECTION_NAME),
  ) {}
  async getAll(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.TRANSLATION', 'translation')
      .getMany();
  }

  async get(id: number): Promise<Product> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.TRANSLATION', 'translation')
      .where('product.ID = :id', { id })
      .getOne();
  }

  async create(product: ProductInput): Promise<ProductOutput> {
    const newProduct = new Product();
    const newTranslation = new Translation();
    newProduct.PRICE = product.PRICE;
    newProduct.AVAILABILITY = product.AVAILABILITY;
    newTranslation.LANG = product.LANG;
    newTranslation.NAME = product.NAME;
    await this.connectionManager.transaction( async transactionalEntityManager => {
      await transactionalEntityManager.save(newProduct) ;
      newTranslation.PRODUCT_ID = newProduct.ID;
      await transactionalEntityManager.save(newTranslation);
    });
    const createdProduct = new ProductOutput();
    createdProduct.ID = newProduct.ID;
    createdProduct.AVAILABILITY = newProduct.AVAILABILITY;
    createdProduct.PRICE = newProduct.PRICE;
    // TODO: add array of translations
    return createdProduct;
  }

  async update(receivedProduct: ProductInput): Promise<void> {
    // const product = await this.get(receivedProduct.ID)
    // await this.productRepository.save(product); // TODO: finish update product
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete({ ID: id });
  }
}
