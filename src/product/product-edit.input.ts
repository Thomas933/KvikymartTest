import { InputType, Field, Float, Int } from 'type-graphql';
import { Availability } from './product.input';
import { ProductTranslationEditInput } from '../productTranslation/productTranslation-edit.input';

@InputType('ProductEditInput')
export class ProductEditInput {
  @Field(type => Int)
  ID: number;
  @Field(type => [ProductTranslationEditInput])
  TRANSLATIONS = [ProductTranslationEditInput];
  @Field(type => Availability, { nullable: true })
  AVAILABILITY: Availability;
  @Field(type => Float, { nullable: true })
  PRICE: number;
}
