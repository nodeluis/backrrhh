import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate} from 'typeorm';
import { UserInterface } from './User.interface';
import { hash } from 'bcryptjs';

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