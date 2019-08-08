import {Entity, PrimaryGeneratedColumn, Column, JoinColumn} from 'typeorm';
import {ProductTranslation} from './ProductTranslation';

enum availability {
    in_stock,
    on_order,
    not_available,
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({type: 'money'})
    PRICE: number;

    @Column('enum', {enum: availability})
    AVAILABILITY: string;

    @JoinColumn({
        name: 'TRANSLATION_ID',
        referencedColumnName: 'ID',
    })
    TRANSLATION: ProductTranslation;
}
