/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature(
      [{ name: Auth.name, schema: AuthSchema }],
      'auth'
    )
    ],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule {}