import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './Schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'user',
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, User],
})
export class UserModule {}
