/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return '1';
  }

  @Get()
  getAll() {
    return '1'
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return '1'
  }

  @Patch(':id')
  updateProductById(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return '1'
  }
}
