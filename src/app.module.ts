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
    MongooseModule.forRoot(
      `mongodb+srv://enriko:enriko123@cluster0.ietduup.mongodb.net/market?retryWrites=true&w=majority`,
      {
        connectionName: 'user',
      },
    ),
    MongooseModule.forRoot(
      `mongodb+srv://enriko:enriko123@cluster0.ietduup.mongodb.net/market?retryWrites=true&w=majority`,
      {
        connectionName: 'product',
      },
    ),
    MongooseModule.forRoot(
      `mongodb+srv://enriko:enriko123@cluster0.ietduup.mongodb.net/market?retryWrites=true&w=majority`,
      {
        connectionName: 'order',
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
