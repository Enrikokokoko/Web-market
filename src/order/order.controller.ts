/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto):Promise<Order>  {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  getAllOrders(): Promise<Order[]>  {
    return this.orderService.getAll()
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Promise<Order>  {
    return this.orderService.getById(id)
  }

  @Patch(':id')
  updateOrderById(@Body() updateOrderDto: UpdateOrderDto, @Param('id') id: string): Promise<Order>  {
    return this.orderService.update(id, updateOrderDto)
  }
}
