/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    
    async create(): Promise<any> {
        return '1'
    }

    async getAll(): Promise<any> {
        return '1'
    }

    async getById(): Promise<any> {
        return '1'
    }

    async updateById(): Promise<any> {
        return '1'
    }
}