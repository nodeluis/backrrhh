
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import { TickeoInterface } from './tickeo.interface';

@Entity()
export class TickeoEntity implements TickeoInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    entryTimeTomorrow:Date;

    @Column()
    departureTimeTomorrow:Date;

    @Column()
    minutesLateTomorrow:number;

    @Column()
    lateEntryTime:Date;

    @Column()
    lateCheckOutTime:Date;

    @Column()
    minutesLateInAfternoon:number;

    

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

}