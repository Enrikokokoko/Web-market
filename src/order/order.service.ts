/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    async create(createDto: CreateOrderDto) {
        return '1'
    }

    async getAll() {
        return '1'
    }

    async getById(id: string) {
        return '1'
    }

    async update(updateDto: UpdateOrderDto, id: string) {
        return '1'
    }
}