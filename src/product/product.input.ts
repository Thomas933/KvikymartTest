import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field(type => String)
  AVAILABILITY: string;
  @Field(type => Float)
  PRICE: number;
  @Field(type => String)
  LANG: string;
  @Field(type => String)
  NAME: string;

  // TODO: add array of translations
}

enum Direction {
  in_stock,
  on_order,
  not_available,
}

enum lang {
  cs,
  en,
}
