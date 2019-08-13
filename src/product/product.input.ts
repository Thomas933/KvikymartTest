import { InputType, Field, Float, registerEnumType  } from 'type-graphql';
import { ProductTranslationInput  } from '../productTranslation/productTrasnlation.input';

export enum Availability {
  in_stock = 'in_stock',
  on_order = 'on_order',
  not_available = 'not_available',
}

registerEnumType(Availability, {
  name: 'Availability',
});

@InputType('ProductInput')
export class ProductInput {
  @Field(type => [ProductTranslationInput] )
  TRANSLATIONS = [ProductTranslationInput];
  @Field(type => Availability)
  AVAILABILITY: Availability;
  @Field(type => Float)
  PRICE: number;
}
