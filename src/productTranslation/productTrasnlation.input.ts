import { Field, registerEnumType, InputType  } from 'type-graphql';

export enum Lang {
  cs = 'cs',
  en = 'en',
}

registerEnumType(Lang, {
  name: 'Lang',
});
@InputType()
export class ProductTranslationInput {
  @Field(type => Lang)
  LANG: Lang;
  @Field(type => String)
  NAME: string;
}
