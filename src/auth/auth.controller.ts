/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { Auth } from './schema/auth.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('registr')
    registr(@Body() createAuthDto: CreateAuthDto): Promise<Auth> {
        return this.authService.registration(createAuthDto)
    }

    @Post('login')
    async login(@Body() signInDto: CreateAuthDto): Promise<object> {
        const user = await this.authService.signIn(signInDto.username, signInDto.password)

        const token = await this.authService.sign({ username: user.username })

        return { token }
    }

    @Post('logout')
    logOut(@Body() signOutDto: Record<string, any>): any {
        return signOutDto
    }

}
