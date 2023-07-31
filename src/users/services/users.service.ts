import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PG') private clientPg: Client,
    private productsService: ProductsService,
    private configServices: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService
  ) { }

  async findAll() {
    // const apiKey = this.configServices.get('API_KEY');
    // const dbName = this.configServices.get('DATABASE_NAME');
    // console.log(apiKey, dbName);
    return await this.userRepo.find({
      relations: ['customer']
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email) {
    return await this.userRepo.findOne({ where: { email } })
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPass = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPass;
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return await this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id: id });
    this.userRepo.merge(user, changes);
    return await this.userRepo.create(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id: id });
    return await this.userRepo.delete(user);
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll()
    };
  }

  // getTasks() {
  //   console.log('hola2')

  //   return new Promise((resolve, reject) => {
  //     this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //       if (err) { reject(err); }
  //       resolve(res.rows);
  //     });
  //   });
  // }
}
