import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, } from 'typeorm';
import {TranslationProduct} from './TranslationPorduct';

enum availability {
    in_stock,
    on_order,
    not_available,
}

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({type: 'money'})
    PRICE: number;

    @Column('enum', {enum: availability})
    AVAILABILITY: string;

    @Column()
    TRANSLATION_ID: number;

    @JoinColumn({
        name: 'TRANSLATION_ID',
        referencedColumnName: 'ID',
    })
    TRANSLATION: TranslationProduct;
}
