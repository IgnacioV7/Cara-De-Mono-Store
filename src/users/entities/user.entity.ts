import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Exclude } from 'class-transformer';

import { Customer } from "./customer.entity";

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string; //script

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Exclude()
  @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', })
  updateAt: Date;

  @OneToOne(() => Customer, (custumer) => custumer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
