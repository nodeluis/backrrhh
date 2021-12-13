import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';
import { TypeAfiliattionInterface } from './TypeAfiliation.interface';

@Entity()
export class TypeAfiliationEntity implements TypeAfiliattionInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

}