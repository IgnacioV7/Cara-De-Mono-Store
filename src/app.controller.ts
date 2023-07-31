import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.services';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@ApiTags('extras')
@UseGuards(ApiKeyGuard)
@Controller('extras')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({ summary: 'Hola Mundo! Y un poquito mas. | Hello World! And a little more.' })
  @Public()
  @Get('hellow-word')
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @ApiOperation({ summary: 'Primera conexion a una base de datos Postgres. | First connection to a Postgres database.' })
  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
