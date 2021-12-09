import { EdificeEntity } from '../edifice/Edifice.entity';
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, ManyToOne} from 'typeorm';
import { PcAuthInterface } from './pcauth.interface';

@Entity()
export class PcAuthEntity implements PcAuthInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ip:string;

    @Column()
    mac:string;

    @Column({
        name: 'last_update',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    lastUpdate:Date;

    @Column({
        name: 'last_connection',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    lastConnection:Date;

    @Column()
    enabled:boolean;

    @ManyToOne(() => EdificeEntity, edif => edif.pcauth)
    edifice: EdificeEntity;

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