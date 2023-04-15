import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { AuthController } from 'src/auth/auth.controller';
import { User, UserSchema } from './Schema/user.schema';
import { Auth, AuthSchema } from 'src/auth/schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'user',
    ),
    MongooseModule.forFeature(
      [{ name: Auth.name, schema: AuthSchema }],
      'auth',
    ),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService],
})
export class UserModule {}
