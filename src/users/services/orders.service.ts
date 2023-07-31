import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) { }

  async findAll() {
    return await this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id: id },
      relations: ['items', 'items.product']
      // relations: {
      //   items: {
      //     product: true,
      //   },
      // },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async ordersByCustomer(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['customer'],
    });
    const customerId = user.customer.id;
    return await this.orderRepo.findOne({
      where: {
        customer: { id: customerId },
      },
      relations: ['items', 'items.product'],
    });
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({ where: { id: data.customerId } });
      order.customer = customer;
    }
    return await this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id: id } });
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({ where: { id: changes.customerId } });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const customer = await this.orderRepo.findOneBy({ id: id });
    return await this.orderRepo.delete(customer);
  }
}
