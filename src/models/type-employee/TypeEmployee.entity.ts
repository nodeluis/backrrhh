import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import { ContractEntity } from '../contract/Contract.entity';
import { TypeAfiliationEntity } from '../type-afiliation/TypeAfiliation.entity';
import { TypeEmployeeInterface } from './TypeEmployee.interface';

@Entity()
export class TypeEmployeeEntity implements TypeEmployeeInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    enabled:boolean;

    @OneToOne(() => TypeAfiliationEntity)
    @JoinColumn()
    typeAfiliation: TypeAfiliationEntity;

    @OneToMany(() => ContractEntity, c => c.typeEmployee)
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