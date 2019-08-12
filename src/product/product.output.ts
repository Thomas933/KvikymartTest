import { ObjectType, Field, Float, Int } from 'type-graphql';

@ObjectType()
export class ProductOutput {
  @Field(type => Int)
  ID: number;
  @Field(type => String)
  NAME: string;
  @Field(type => String)
  AVAILABILITY: string;
  @Field(type => Float)
  PRICE: number;

  // TODO: add array of translations
}
