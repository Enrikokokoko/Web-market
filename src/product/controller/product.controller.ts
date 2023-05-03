/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../product.service';
import { Product } from '../schema/product.schema';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAll()
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id)
  }

  @Patch(':id')
  updateProductById(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
    return this.productService.updateById(updateProductDto, id)
  }
}
