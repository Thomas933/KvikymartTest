import { Field, Int, InputType } from 'type-graphql';
import { Lang } from './productTrasnlation.input';

@InputType()
export class ProductTranslationEditInput {
  @Field(type => Int)
  ID: number;
  @Field(type => Lang, {nullable: true})
  LANG: Lang;
  @Field(type => String, {nullable: true})
  NAME: string;
}
