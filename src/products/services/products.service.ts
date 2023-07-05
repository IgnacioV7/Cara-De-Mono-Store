import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) { }

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    return await this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productRepo.findOneBy({ id: id })
    this.productRepo.merge(product, changes);
    return await this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id: id })
    return await this.productRepo.delete(product);
  }
}
