import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from 'typeorm';
import { ContractEntity } from '../contract/Contract.entity';
import { TickeoEntity } from '../tickeo/Tickeo.entity';
import { EmployeeInterface } from './Employee.interface';


@Entity()
export class EmployeeEntity implements EmployeeInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ci:string;

    @Column()
    civilStatus:string;

    @Column({
        type: 'timestamptz',
        default:() => 'null',
        nullable: true,
    })
    dateOfAdmission:Date;

    @Column({
        type: 'timestamptz',
        default:() => 'null',
        nullable: true,
    })
    dateOfBirth:Date;

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

    @Column({
        type: String,
        default:() => 'null',
        nullable: true,
    })
    photography:string;

    @Column()
    placeOfBirth:string;

    @Column()
    qr:string;

    @OneToMany(() => TickeoEntity, tick => tick.employee)
    tickeo: TickeoEntity[];

    @OneToMany(() => ContractEntity, c => c.employee)
    contracts: ContractEntity[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

}