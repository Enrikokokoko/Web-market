/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../Schema/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name, 'user') private userModel: Model<UserDocument>) {}
    
    async create(userDto: CreateUserDto): Promise<User> {
        const hash = createHash('sha256').update(userDto.password).digest('hex') 
        
        return this.userModel.create({ ...userDto, createdAt: new Date(), password: hash })
    }
    
    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }

    async update(userDto: UpdateUserDto, id: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userDto, { new: true })
    }
}
