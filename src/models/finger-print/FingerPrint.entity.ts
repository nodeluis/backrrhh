import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToOne, JoinColumn} from 'typeorm';
import { FingerPrintInterface } from './FingerPrint.interface';
import { EmployeeEntity } from '../employees/Employee.entity';

@Entity()
export class FingerPrintEntity implements FingerPrintInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    thumb: string;

    @Column()
    index: string;

    @Column()
    middle: string;

    @Column()
    ring: string;

    @Column()
    little: string;

    @Column()
    enabled:boolean;

    @OneToOne(() => EmployeeEntity)
    @JoinColumn()
    employee: EmployeeEntity;

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