import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpStatus, HttpCode, Res /*, ParseIntPipe*/ } from '@nestjs/common';
// import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/pipes/parse-int/parse-int.pipe';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get('filter')
  getProductFilter() {
    return { mensaje: `yo soy un filtro` };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: string) {
    // response.status(200).send({
    //   mensaje: `product ${productId}`,
    // });
    return this.productsService.findOne(+productId);
  }

  @Get()
  getProducts(
    // @Query('limit') limit = 100,
    // @Query('offset') offset = 0,
    // @Query('brand') brand: string
  ) {
    // return { mensaje: `products: limit => ${limit}, offset => ${offset}, brand => ${brand}` };
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    // return { mensaje: 'Ación de crear', payload };
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() payload: UpdateProductDTO) {
    // return { mensaje: 'Ación de editar', product: id, payload };
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    // return { mensaje: 'Ación de Eliminar', product: id };
    return this.productsService.remove(+id);
  }
}
