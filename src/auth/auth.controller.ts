/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/Schema/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('registr')
    registr(@Body() createAuthDto: CreateAuthDto): Promise<User> {
        return this.authService.registration(createAuthDto)
    }

    @Post('login')
    login(@Body() signInDto: CreateAuthDto): Promise<User> {

        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @Post('logout')
    logOut(@Body() signOutDto: Record<string, any>): any {
        return signOutDto
    }

}
