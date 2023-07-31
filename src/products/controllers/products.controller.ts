import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/pipes/parse-int/parse-int.pipe';
import { CreateProductDTO, FilterProductsDto, UpdateProductDTO } from '../dtos/products.dtos';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard) // Permite que la mayoria de controladores necesiten un token para ser consultados
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Public() // Permite que este controlador es publico, no necesita un token
  @Get('filter')
  getProductFilter() {
    return { mensaje: `yo soy un filtro` };
  }

  @Public() // Permite que este controlador es publico, no necesita un token
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // response.status(200).send({
    //   mensaje: `product ${productId}`,
    // });
    return this.productsService.findOne(productId);
  }

  @Public() // Permite que este controlador es publico, no necesita un token
  @Get()
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDTO) {
    // return { mensaje: 'Ación de crear', payload };
    return this.productsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateProductDTO) {
    // return { mensaje: 'Ación de editar', product: id, payload };
    return this.productsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id/category/:categoryId')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.productsService.addCategoryByProduct(id, categoryId);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    // return { mensaje: 'Ación de Eliminar', product: id };
    return this.productsService.remove(id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/category/:categoryId')
  deleteCategory(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
