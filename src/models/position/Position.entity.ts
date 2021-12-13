import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { ContractEntity } from '../contract/Contract.entity';
import { UnitedEntity } from '../united/United.entity';
import { PositionInterface } from './Position.interface';


@Entity()
export class PositionEntity implements PositionInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    requiredSkill:string;

    @Column()
    enabled:boolean;

    @ManyToMany(() => UnitedEntity)
    @JoinTable()
    uniteds: UnitedEntity[];

    @OneToMany(() => ContractEntity, c => c.position)
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