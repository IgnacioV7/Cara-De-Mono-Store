import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Between, FindOptionsWhere } from 'typeorm';

import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import { CreateProductDTO, FilterProductsDto, UpdateProductDTO } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) { }

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice)
      }
      return await this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset
      });
    }
    return await this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: ['brand', 'categories']
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId }
      });
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({ id: In(data.categoriesIds) });
      newProduct.categories = categories;
    }
    return await this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productRepo.findOneBy({ id: id });
    if (changes.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: changes.brandId });
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({ id: In(changes.categoriesIds) });
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return await this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({ id: id });
    return await this.productRepo.delete(product);
  }

  async removeCategoryByProduct(producId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: producId },
      relations: ['categories']
    });
    product.categories = product.categories.filter((item) => item.id !== categoryId);
    return await this.productRepo.save(product);
  }

  async addCategoryByProduct(producId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: producId },
      relations: ['categories']
    });
    const category = await this.categoryRepo.findOneBy({ id: categoryId })
    product.categories.push(category);
    return await this.productRepo.save(product);
  }
}
