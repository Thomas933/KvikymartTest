import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from 'typeorm';
import { Translation } from './Translation';
import { Field, ObjectType, Float, Int } from 'type-graphql';

enum Availability {
  in_stock,
  on_order,
  not_available,
}

@Entity('products')
@ObjectType()
export class Product {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  readonly ID: number;

  @Field(type => Float)
  @Column({ type: 'decimal' })
  PRICE: number;

  @Field(type => String)
  @Column('enum', { enum: Availability })
  AVAILABILITY: string;

  @Field(type => Translation)
  @OneToMany(type => Translation, translation => translation.PRODUCT)
  @JoinColumn({
    name: 'ID',
    referencedColumnName: 'PRODUCT_ID',
  })
  TRANSLATIONS: Translation[];
}
