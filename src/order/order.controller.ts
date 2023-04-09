/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return '1';
  }

  @Get()
  getAllOrders() {
    return '1'
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return '1'
  }

  @Patch(':id')
  updateOrderById(@Body() updateOrderById: UpdateOrderDto, @Param('id') id: string) {
    return '1'
  }
}
