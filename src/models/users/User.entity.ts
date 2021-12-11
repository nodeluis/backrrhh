import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, OneToMany} from 'typeorm';
import { UserInterface } from './User.interface';
import { hash } from 'bcryptjs';
import { EmployeeEntity } from '../employees/Employee.entity';
import { RegularizationEntity } from '../regularization/Regularization.enity';

@Entity()
export class UserEntity implements UserInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user:string;

    @Column({select: false})
    password:string;

    @Column({type: 'text',array: true,default:[]})
    roles: string[];

    /**
     * relaciones
     */

    @OneToOne(() => EmployeeEntity)
    @JoinColumn()
    employee: EmployeeEntity;

    @OneToMany(() => RegularizationEntity, reg => reg.user)
    regularization: RegularizationEntity[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return;
        }
        this.password = await hash(this.password, 10);
    }

}