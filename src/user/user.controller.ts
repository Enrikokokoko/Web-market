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
    return `this.UserService.create(createUserDto)`
  }
  
  @Get()
  allUsers() {
    return 'this.UserService.getAll()'
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return `this.UserService.getUser(id)`
  }

  @Patch(':id')
  updateUserById(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return 'this.UserService.update(id, updateUserDto)'
  }

}
