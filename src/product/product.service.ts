import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, getConnectionManager } from 'typeorm';
import { Product } from '../entity/Product';
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
    private connectionManager = getConnectionManager().get(
      DEFAULT_CONNECTION_NAME,
    ),
  ) {}

  async getProducts(lang: string | null, availability: string | null): Promise<Product[]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.TRANSLATIONS', 'translations');
    if (lang) {
      query.where('translations.LANG = :lang', {lang});
    }
    if (availability) {
      query.andWhere('product.AVAILABILITY = :availability', {availability});
    }
    return query.getMany();
  }

  async getProduct(id: number, lang: string | null): Promise<Product> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.TRANSLATIONS', 'translations')
      .where('product.ID = :id', { id });
    if (lang) {
      query.andWhere('translations.LANG = :lang', {lang});
    }
    return query.getOne();
  }

  async createProduct(productInput: any): Promise<ProductOutput> {
    const newProduct = new Product();
    const createdProduct = new ProductOutput();
    newProduct.PRICE = productInput.PRICE;
    newProduct.AVAILABILITY = productInput.AVAILABILITY;
    await this.connectionManager.transaction(
      async transactionalEntityManager => {
        await transactionalEntityManager.save(newProduct);
        createdProduct.ID = newProduct.ID;
        createdProduct.PRICE = newProduct.PRICE;
        createdProduct.AVAILABILITY = newProduct.AVAILABILITY;
        createdProduct.TRANSLATIONS = [];
        await Promise.all(productInput.TRANSLATIONS.map(async translation => {
            const newTranslation = new Translation();
            newTranslation.PRODUCT_ID = newProduct.ID;
            newTranslation.NAME = translation.NAME;
            newTranslation.LANG = translation.LANG;
            await transactionalEntityManager.save(newTranslation);
            createdProduct.TRANSLATIONS.push(newTranslation);
            return newTranslation;
          }),
        );
      },
    );
    return createdProduct;
  }

  async updateProduct(receivedProduct: any): Promise<any | Product> {
    const product = await this.getProduct(receivedProduct.ID, null);
    if (product instanceof Product) {
      const updatedProduct = this.generateEditProduct(receivedProduct, product);
      await this.connectionManager.transaction(
        async transactionalEntityManager => {
          await transactionalEntityManager.save(updatedProduct);
        },
      );
      return updatedProduct;
    }
    winston.error(`Couldn't edit product wid id ${receivedProduct.ID}`);
    return null;
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const product = await this.getProduct(id, null);
      if (product instanceof Product) {
        await this.connectionManager.transaction(
          async transactionalEntityManager => {
            await transactionalEntityManager
              .createQueryBuilder()
              .delete()
              .from(Translation)
              .where('PRODUCT_ID = :id', { id })
              .execute();
            await transactionalEntityManager
              .createQueryBuilder()
              .delete()
              .from(Product)
              .where('ID = :id', { id })
              .execute();
          },
        );
        return true;
      }
    } catch (e) {
      winston.error(e.message);
      return false;
    }
    return false;
  }

  private generateEditProduct(receivedProduct: any, product: Product): Product {
    const newProduct = product;
    newProduct.PRICE = receivedProduct.PRICE || newProduct.PRICE;
    newProduct.AVAILABILITY =
      receivedProduct.AVAILABILITY || newProduct.AVAILABILITY;
    newProduct.TRANSLATIONS.map(translation => {
      receivedProduct.TRANSLATIONS.find(updatedTranslation => {
        if (updatedTranslation.ID === translation.ID) {
          translation.LANG = updatedTranslation.LANG || translation.LANG;
          translation.NAME = updatedTranslation.NAME || translation.NAME;
        }
      });
    });
    return newProduct;
  }
}
