import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Product } from './Product';

enum Lang {
  cs,
  en,
}

@Entity('translations')
@ObjectType()
export class Translation {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  readonly ID: number;

  @Field(type => Int)
  @Column()
  PRODUCT_ID: number;

  @Field(type => String)
  @Column('enum', { enum: Lang })
  LANG: string;

  @Field(type => String)
  @Column()
  NAME: string;

  @Field(type => Product)
  @ManyToOne(type => Product, product => product.TRANSLATIONS, {
    cascade: true,
  })
  @JoinColumn({
    name: 'PRODUCT_ID',
    referencedColumnName: 'ID',
  })
  PRODUCT: Product;
}
