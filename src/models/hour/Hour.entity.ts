import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { HourHandEntity } from '../hour-hand/HourHand.entity';
import { TickeoEntity } from '../tickeo/Tickeo.entity';
import { HourInterface } from './Hour.interface';

@Entity()
export class HourEntity implements HourInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    entryTomorrow:Date;

    @Column()
    departureTomorrow:Date;

    @Column()
    lateEntry:Date;

    @Column()
    lateCheckOut:Date;

    @Column()
    entryTomorrowLimitInitial:Date;

    @Column()
    entryTomorrowLimitFinal:Date;

    @Column()
    departureTomorrowLimitInitial:Date;

    @Column()
    departureTomorrowLimitFinal:Date;

    @Column()
    lateEntryLimitInitial:Date;

    @Column()
    lateEntryLimitFinal:Date;

    @Column()
    lateCheckOutLimitInitial:Date;

    @Column()
    lateCheckOutLimitFinal:Date;

    @Column()
    enabled:boolean;

    @Column()
    dischargeDate:Date;

    @ManyToOne(() => HourHandEntity, hhand => hhand.hour)
    hourHand: HourHandEntity;

    @OneToMany(() => TickeoEntity, tick => tick.hour)
    tickeo: TickeoEntity[];

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