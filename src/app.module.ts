import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    ProductModule,
    OrderModule,
    AuthModule,
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
    MongooseModule.forRoot(
      `mongodb+srv://enriko:enriko123@cluster0.ietduup.mongodb.net/market?retryWrites=true&w=majority`,
      {
        connectionName: 'auth',
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
