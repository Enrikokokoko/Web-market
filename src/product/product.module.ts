import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Product.name, schema: ProductSchema }],
            'product'
        )
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {}
