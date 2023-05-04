/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schema/order.schema';
import { User, UserDocument } from '../../user/Schema/user.schema';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Product, ProductDocument } from '../../product/schema/product.schema';
import { OrderInterface } from '../interface/order.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name, 'order') private orderModel: Model<OrderDocument>,
        @InjectModel(User.name, 'user') private userModel: Model<UserDocument>,
        @InjectModel(Product.name, 'product') private productModel: Model<ProductDocument>
    ) {};

    async create(createDto: OrderInterface): Promise<Order> {
        const user = await this.userModel.findOne({ _id:createDto.userId });
        const product = await this.productModel.find({ _id:createDto.products });
        const summProduct = product.reduce((amount, products) => {
            return amount + products.price;
        }, 0);

        if(!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        };
        
        if (user.balance < summProduct) {
            throw new HttpException('User dont have enough money', HttpStatus.BAD_REQUEST);
        };
        
        const newOrder = new this.orderModel({ ...createDto, createdAt: new Date(), });
        await this.userModel.updateOne({ _id:createDto.userId }, { balance: user.balance - summProduct });
        return newOrder.save();    
    };

    async getAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    };

    async getById(id: string): Promise<Order> {
        return this.orderModel.findById(id).exec();
    };

    async update(id: string, updateDto: UpdateOrderDto): Promise<Order> {
        return this.orderModel.findByIdAndUpdate(id, updateDto, { new: true });
    };
}