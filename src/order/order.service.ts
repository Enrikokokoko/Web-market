/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name, 'order') private orderModel: Model<OrderDocument>) {}

    async create(createDto: CreateOrderDto):Promise<Order> {
        const newOrder = new this.orderModel(createDto);
        return newOrder.save();
    }

    async getAll():Promise<Order[]>  {
        return this.orderModel.find().populate('Product').exec()
    }

    async getById(id: string):Promise<Order>  {
        return this.orderModel.findById(id).exec()
    }

    async update(id: string, updateDto: UpdateOrderDto):Promise<Order>  {
        return this.orderModel.findByIdAndUpdate(id, updateDto, { new: true })
    }
}