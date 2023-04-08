/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './Schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name, 'user') private userModel: Model<UserDocument>) {}
    
    async create(userDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(userDto)
        return user.save()
    }
    
    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<User> {
        return this.userModel.findById(id);
    }

    async update(userDto: UpdateUserDto, id: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userDto, { new: true })
    }
}
