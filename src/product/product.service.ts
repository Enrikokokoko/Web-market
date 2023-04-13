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
        const newProduct = new this.productModel({ ...createDto, createdAt: new Date() })
        return newProduct.save()
    }

    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }

    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id).exec()
    }

    async updateById(updateDto: UpdateProductDto, id: string): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, updateDto, { new: true })
    }
}