import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import { RegularizationEntity } from '../regularization/Regularization.entity';
import { ReasonInterface } from './Reason.interface';

@Entity()
export class ReasonEntity implements ReasonInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    type:string;

    @ManyToOne(() => RegularizationEntity, regularization => regularization.reason)
    regularization: RegularizationEntity;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

}