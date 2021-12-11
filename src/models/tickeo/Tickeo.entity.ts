
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { EmployeeEntity } from '../employees/Employee.entity';
import { HourEntity } from '../hour/Hour.entity';
import { RegularizationEntity } from '../regularization/Regularization.enity';
import { TickeoInterface } from './Tickeo.interface';

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

    @ManyToOne(() => EmployeeEntity, emp => emp.tickeo)
    employee: EmployeeEntity;

    @ManyToOne(() => HourEntity, ho => ho.tickeo)
    hour: HourEntity;

    @ManyToMany(() => RegularizationEntity)
    @JoinTable()
    regularization: RegularizationEntity[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

}