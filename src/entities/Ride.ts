import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import User from './User';
import { rideStatus } from '../types/types';

const RIDE_STATUS = [
    'ACCEPTED',
    'FINIHSED',
    'CANCELED',
    'REQUESTING',
    'ONROUTE'
];

@Entity()
class Ride extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', enum: RIDE_STATUS, default: 'REQUESTING' })
    status: rideStatus;

    @Column({ type: 'text' })
    pickUpAddress: string;

    @Column({ type: 'double precision', default: 0 })
    pickUpLat: number;

    @Column({ type: 'double precision', default: 0 })
    pickUpLng: number;

    @Column({ type: 'text' })
    dropOffAddress: string;

    @Column({ type: 'double precision', default: 0 })
    dropOffLat: number;

    @Column({ type: 'double precision', default: 0 })
    dropOffLng: number;

    @Column({ type: 'double precision', default: 0 })
    price: number;

    @Column({ type: 'text' })
    duration: string;

    @Column({ type: 'text' })
    distance: string;

    @Column({ nullable: true })
    passengerId: number;

    @ManyToOne((type) => User, (user) => user.ridesAsPassenger)
    passenger: User;

    @Column({ nullable: true })
    driverId: number;

    @ManyToOne((type) => User, (user) => user.ridesAsDriver, { nullable: true })
    driver: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Ride;
