import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class ProductTranslation {

  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  PRODUCT_ID: string;

  @Column()
  LANG_CZ: string;

  @Column()
  LANG_EN: string;
}
