import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { EmployeeInterface } from './Employee.interface';


@Entity()
export class EmployeeEntity implements EmployeeInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ci:string;

    @Column()
    civilStatus:string;

    @Column()
    dateOfAdmission:string;

    @Column()
    dateOfBirth:string;

    @Column()
    employedName:string;

    @Column()
    enabled:boolean;

    @Column()
    gender:string;

    @Column()
    lastName1:string;

    @Column()
    lastName2:string;

    @Column()
    mobile:string;

    @Column()
    nit:number;

    @Column()
    description:string;

    @Column()
    photography:string;

    @Column()
    placeOfBirth:string;

    @Column()
    qr:string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

}