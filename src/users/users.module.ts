import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { CustumersController } from './controllers/custumers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity';

import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItem } from './entities/order-item.entity';

import { ProductsModule } from './../products/products.module';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer, Order, OrderItem])],
  controllers: [UsersController, CustumersController, OrderItemController, OrdersController, ProfileController],
  providers: [UsersService, CustomersService, OrderItemService, OrdersService],
  exports: [UsersService]
})
export class UsersModule { }
