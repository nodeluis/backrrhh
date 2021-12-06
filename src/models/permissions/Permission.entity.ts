import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { PermissionsInterface } from './Permission.interface';

@Entity()
export class PermissionEntity implements PermissionsInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('boolean', {default: true})
    admin:boolean=false;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}