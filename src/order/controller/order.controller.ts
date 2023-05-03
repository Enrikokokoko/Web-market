/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderService } from '../service/order.service';
import { Order } from '../schema/order.schema';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: any):Promise<any>  {
    return this.orderService.create({...createOrderDto, userId: req.user.sub})
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
