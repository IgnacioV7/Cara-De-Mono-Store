import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType, OmitType  } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  // @ApiProperty()
  // @IsNumber()
  // @IsNotEmpty()
  // @IsPositive()
  // readonly price: number;

  // @ApiProperty()
  // @IsNumber()
  // @IsNotEmpty()
  // @IsPositive()
  // readonly stock: number;

  // @ApiProperty()
  // @IsUrl()
  // @IsNotEmpty()
  // readonly image: string;
}

export class UpdateProductDTO extends PartialType(OmitType(CreateProductDTO, ['name'])) { }
