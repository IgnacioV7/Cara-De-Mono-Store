import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
