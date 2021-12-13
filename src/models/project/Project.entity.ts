import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany} from 'typeorm';
import { ContractEntity } from '../contract/Contract.entity';
import { ProjectInterface } from './Project.interface';

@Entity()
export class ProjectEntity implements ProjectInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    code:string;

    @Column()
    year:number;

    @Column()
    enabled:boolean;

    @OneToMany(() => ContractEntity, c => c.project)
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