import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString()
  @MinLength(1)
  title: string;
}
