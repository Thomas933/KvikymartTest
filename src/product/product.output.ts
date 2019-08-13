import { ObjectType, Field, Float, Int } from 'type-graphql';
import { Translation } from '../entity/Translation';

@ObjectType()
export class ProductOutput {
  @Field(type => Int)
  ID: number;
  @Field(type => [Translation])
  TRANSLATIONS: Translation[];
  @Field(type => String)
  AVAILABILITY: string;
  @Field(type => Float)
  PRICE: number;
}
