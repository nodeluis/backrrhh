import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany} from 'typeorm';
import { ContractEntity } from '../contract/Contract.entity';
import { HourEntity } from '../hour/Hour.entity';
import { HourHandInterface } from './HourHand.interface';

@Entity()
export class HourHandEntity implements HourHandInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    enabled:boolean;

    @OneToMany(() => HourEntity, h => h.hourHand)
    hour: HourEntity[];

    @OneToMany(() => ContractEntity, c => c.hourHand)
    contracts: ContractEntity[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @BeforeInsert()
    async beforeInsertActions() {
        this.enabled = true;
    }

}