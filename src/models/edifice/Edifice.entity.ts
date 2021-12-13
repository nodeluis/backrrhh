import { PcAuthEntity } from '../pcauth/pcauth.entity';
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany, JoinTable} from 'typeorm';
import { EdificeInterface } from './Edifice.interface';
import { ContractEntity } from '../contract/Contract.entity';

@Entity()
export class EdificeEntity implements EdificeInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    direction:string;

    @Column()
    lat:string;

    @Column()
    lgn:string;

    @Column()
    online:boolean;

    @Column()
    enabled:boolean;

    @OneToMany(() => PcAuthEntity, pc => pc.edifice)
    pcauth: PcAuthEntity[];

    @OneToMany(() => ContractEntity, c => c.edifice)
    contracts: ContractEntity[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @BeforeInsert()
    async beforeInsertActions() {
        this.pcauth=[];
        this.enabled = true;
    }

}