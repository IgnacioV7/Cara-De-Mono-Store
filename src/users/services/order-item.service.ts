import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dtos';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) { }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOneBy({ id: data.orderId });
    const product = await this.productRepo.findOneBy({ id: data.productId });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.orderItemRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const item = await this.orderItemRepo.findOne({ where: { id: id } });
    if (changes.orderId) {
      const order = await this.orderRepo.findOne({ where: { id: changes.orderId } });
      item.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOne({ where: { id: changes.productId } });
      item.product = product;
    }
    this.orderItemRepo.merge(item, changes);
    return this.orderItemRepo.save(item);
  }

  async remove(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
