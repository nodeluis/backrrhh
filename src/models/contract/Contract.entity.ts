import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, ManyToOne} from 'typeorm';
import { EdificeEntity } from '../edifice/Edifice.entity';
import { EmployeeEntity } from '../employees/Employee.entity';
import { HourHandEntity } from '../hour-hand/HourHand.entity';
import { PositionEntity } from '../position/Position.entity';
import { ProfessionEntity } from '../profession/Profession.entity';
import { ProjectEntity } from '../project/Project.entity';
import { StudyEntity } from '../study/Study.entity';
import { TypeEmployeeEntity } from '../type-employee/TypeEmployee.entity';
import { ContractInterface } from './Contract.interface';

@Entity()
export class ContractEntity implements ContractInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    BankAccount:string;

    @Column()
    item:string;

    @Column()
    dateOfConclusion:Date;

    @Column()
    dateContract:Date;

    @Column()
    description:string;

    @Column()
    worksSaturday:string;

    @Column()
    havingBasic:string;

    @Column()
    tickea:boolean;

    @Column()
    enabled:boolean;

    @ManyToOne(() => PositionEntity, s => s.contracts)
    position: PositionEntity;

    @ManyToOne(() => StudyEntity, s => s.contracts)
    study: StudyEntity;

    @ManyToOne(() => ProfessionEntity, s => s.contracts)
    profession: ProfessionEntity;

    @ManyToOne(() => ProjectEntity, s => s.contracts)
    project: ProjectEntity;

    @ManyToOne(() => TypeEmployeeEntity, s => s.contracts)
    typeEmployee: TypeEmployeeEntity;
    
    @ManyToOne(() => EdificeEntity, s => s.contracts)
    edifice: EdificeEntity;

    @ManyToOne(() => EmployeeEntity, s => s.contracts)
    employee: EmployeeEntity;

    @ManyToOne(() => HourHandEntity, s => s.contracts)
    hourHand: HourHandEntity;

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