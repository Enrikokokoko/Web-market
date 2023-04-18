/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import * as jose from 'jose';
import { TextEncoder } from 'util';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name, 'auth') private authModel: Model<AuthDocument>,
        private readonly jwtService: JwtService
    ) {}
    
    async registration(createDto:CreateAuthDto): Promise<Auth> {

        const hash = createHash('sha256').update(createDto.password).digest('hex')

        const user = new this.authModel({ ...createDto, password: hash});
        return user.save()
    }

    async signIn(username: string, password: string): Promise<any> {
        const hash = createHash('sha256').update(password).digest('hex')

        const user = await this.authModel.findOne({username, password: hash})

        if(!user) {
            throw new HttpException({ message: 'Invalid username or password' }, HttpStatus.BAD_REQUEST)
        } else if (user.password !== hash) {
            throw new HttpException({ message: 'Invalid username or password' }, HttpStatus.BAD_REQUEST)
        } else {
            const payload = { username: user.username, sub: user._id }
            return this.jwtService.signAsync(payload)
            // throw new HttpException({ message: 'Login successful' }, HttpStatus.ACCEPTED)
        }
    }

    async sign (payload: any): Promise<string> {
        const secret = new TextEncoder().encode(
            'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
          )
          const alg = 'HS256'
          
          const jwt = await new jose.SignJWT({ payload })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .sign(secret)
          
          return jwt
    }

    async logout (username: string, password: string): Promise<Auth> {
        return {
            username, password
        }
    }
}
