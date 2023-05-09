/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../../user/Schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name, 'auth') private authModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) {}
    
    async registration(createDto:CreateAuthDto): Promise<User> {

        const hash = createHash('sha256').update(createDto.password).digest('hex')

        return this.authModel.create({ ...createDto, password: hash});
    }

    async signIn(username: string, password: string): Promise<any> {
        const hash = createHash('sha256').update(password).digest('hex')

        const user = await this.authModel.findOne({username, password: hash})

        if(!user) {
            throw new HttpException({ message: 'Invalid username or password' }, HttpStatus.BAD_REQUEST)
        } 
        else if (user.password !== hash) {
            throw new HttpException({ message: 'Invalid username or password' }, HttpStatus.BAD_REQUEST)
        } 
        else {
            const payload = { username: user.username, userId: user._id }
            return { 
                accessToken: await this.jwtService.signAsync(payload)
                // refreshToken: await this.jwtService.signAsync({})           
            }
        }
    }

    async logout (username: string, password: string): Promise<any> {
        return {
            username, password
        }
    }
}
