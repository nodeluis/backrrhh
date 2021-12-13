import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany} from 'typeorm';
import { ContractEntity } from '../contract/Contract.entity';
import { StudyInterface } from './Study.interface';

@Entity()
export class StudyEntity implements StudyInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    enabled:boolean;

    @OneToMany(() => ContractEntity, c => c.study)
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