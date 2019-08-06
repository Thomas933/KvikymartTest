import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    PRICE: string;

    @Column()
    CONDITION: string;
}
