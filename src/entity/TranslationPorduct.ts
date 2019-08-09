import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('translation_products')
export class TranslationProduct {

  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  LANG_CZ: string;

  @Column()
  LANG_EN: string;
}
