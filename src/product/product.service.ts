/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name, 'product') private productModel: Model<ProductDocument>) {}
    async create(createDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(createDto)
        return newProduct.save()
    }

    async getAll(): Promise<any> {
        return this.productModel.find().exec()
    }

    async getById(id: string): Promise<any> {
        return this.productModel.findById(id)
    }

    async updateById(updateDto: UpdateProductDto, id: string): Promise<any> {
        return this.productModel.findByIdAndUpdate(id, updateDto, { new: true })
    }
}