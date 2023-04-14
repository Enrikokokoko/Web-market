/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name, 'auth') private authModel: Model<AuthDocument>) {}
    async registration(createDto:CreateAuthDto): Promise<Auth> {
        const hash = createHash('sha256').update(createDto.password).digest('hex')

        const user = new this.authModel({ ...createDto, password: hash});
        return user.save()
    }

    async signIn(username: string, password: string): Promise<Auth> {
        const hash = createHash('sha256').update(password).digest('hex')

        const user = await this.authModel.findOne({username, password: hash})

        if(!user) {
            throw new HttpException({ message: 'Invalid username or password' }, HttpStatus.BAD_REQUEST)
        } else if (user.password !== hash) {
            throw new HttpException({ message: 'Invalid username or password' }, HttpStatus.BAD_REQUEST)
        } else {
            throw new HttpException({ message: 'Login successful' }, HttpStatus.ACCEPTED)
        }
    }
}
