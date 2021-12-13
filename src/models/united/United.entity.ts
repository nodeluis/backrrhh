import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, ManyToOne, OneToMany, Tree, TreeParent, TreeChildren} from 'typeorm';
import { UnitedInterface } from './United.interface';

@Tree('materialized-path')
@Entity()
export class UnitedEntity implements UnitedInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    code: string;

    @Column()
    name:string;

    @Column()
    p:boolean;

    @Column()
    enabled:boolean;

    @TreeParent()
    parent: UnitedEntity;

    @TreeChildren()
    children: UnitedEntity[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @BeforeInsert()
    async beforeInsertActions() {
        this.p = true;
        this.enabled = true;
    }

}