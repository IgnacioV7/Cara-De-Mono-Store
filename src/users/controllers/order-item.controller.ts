import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dtos';
import { OrderItemService } from '../services/order-item.service';

@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) { }

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }
}
