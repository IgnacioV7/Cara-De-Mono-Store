import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) { }

  async findAll() {
    return await this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({ id: id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return await this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id: id });
    this.categoryRepo.merge(category, changes);
    return await this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({ id: id });
    return await this.categoryRepo.delete(category);
  }
}
