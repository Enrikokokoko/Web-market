import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { User, UserSchema } from 'src/user/Schema/user.schema';
import { Product, ProductSchema } from 'src/product/schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Order.name, schema: OrderSchema }],
      'order',
    ),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'user',
    ),
    MongooseModule.forFeature(
      [{ name: Product.name, schema: ProductSchema }],
      'product',
    ),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
