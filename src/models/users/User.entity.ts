import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import { PermissionEntity } from '../permissions/Permission.entity';
import { UserInterface } from './User.interface';


@Entity()
export class UserEntity implements UserInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user:string;

    @Column()
    password:string;

    /**
     * relaciones
     */
    @OneToOne(() => PermissionEntity)
    @JoinColumn()
    permissions: PermissionEntity;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}