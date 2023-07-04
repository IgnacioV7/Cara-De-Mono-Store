import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    /*@Inject('API_KEY') private apiKey: string,*/
    @Inject('PG') private clientPg: Client,
    @Inject('TASKS') private task: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) { }

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! api_key => ${apiKey}, database => ${dbName}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) { reject(err); }
        resolve(res.rows);
      });
    });
  }
}
