import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Exclude, Expose } from "class-transformer";

import { Customer } from "./customer.entity";
import { OrderItem } from "./order-item.entity";

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({ name: 'create_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'update_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', })
  updateAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.ordes)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.items) {
      return this.items.filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id
        }))
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items.filter((items) => !!items)
        .reduce((acum, item) => {
          const totalItem = item.product.price * item.quantity;
          return acum + totalItem;
        }, 0);
    }

    return 0;
  }
}
