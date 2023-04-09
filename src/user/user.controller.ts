/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
  
  @Get()
  allUsers() {
    return this.userService.getAll()
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email)
  }

  @Patch(':id')
  updateUserById(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(updateUserDto, id)
  }

}
