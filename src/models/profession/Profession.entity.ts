import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany} from 'typeorm';
import { ContractEntity } from '../contract/Contract.entity';
import { ProfessionInterface } from './Profession.interface';

@Entity()
export class ProfessionEntity implements ProfessionInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    grade:number;

    @Column()
    abbreviation:string;

    @Column()
    enabled:boolean;

    @OneToMany(() => ContractEntity, c => c.profession)
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