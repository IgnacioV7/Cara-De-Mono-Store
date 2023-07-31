import { Controller, Get, Param, Post, Body, Put, Delete/*, ParseIntPipe*/ } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomersService } from './../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customers.dtos';

import { ParseIntPipe } from '../../common/pipes/parse-int/parse-int.pipe';

@ApiTags('customers')
@Controller('customers')
export class CustumersController {
  constructor(private customersService: CustomersService) { }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(+id);
  }
}
