import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { RegularizationInterface } from './Regularization.interface';
import { UserEntity } from '../users/User.entity';
import { ReasonEntity } from '../reason/Reason.entity';
import { TickeoEntity } from '../tickeo/Tickeo.entity';

@Entity()
export class RegularizationEntity implements RegularizationInterface{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    turn:string;

    @Column()
    detail:string;

    @ManyToOne(() => UserEntity, user => user.regularization)
    user: UserEntity;

    @OneToMany(() => ReasonEntity, reason => reason.regularization)
    reason: ReasonEntity[];

    @ManyToMany(() => TickeoEntity)
    @JoinTable()
    tickeo: TickeoEntity[];

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

}