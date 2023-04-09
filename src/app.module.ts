import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    OrderModule,
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/Web-market/market`, {
      connectionName: 'user',
    }),
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/Web-market/market`, {
      connectionName: 'product',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
