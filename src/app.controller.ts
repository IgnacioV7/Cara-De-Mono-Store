import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.services';

@ApiTags('extras')
@Controller('extras')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary: 'Hola Mundo! Y un poquito mas. | Hello World! And a little more.'})
  @Get('hellow-word')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @ApiOperation({summary: 'Primera conexion a una base de datos Postgres. | First connection to a Postgres database.'})
  @Get('tasks')
  tasks(){
    return this.appService.getTasks();
  }
}
