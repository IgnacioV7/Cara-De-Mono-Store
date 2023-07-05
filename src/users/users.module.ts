import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { CustumersController } from './controllers/custumers.controller';
import { CustomersService } from './services/customers.service';

import { ProductsModule } from './../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustumersController],
  providers: [UsersService, CustomersService]
})
export class UsersModule { }
