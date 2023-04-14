/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('registr')
    registr(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.registration(createAuthDto)
    }

    @Post('login')
    login(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

}
