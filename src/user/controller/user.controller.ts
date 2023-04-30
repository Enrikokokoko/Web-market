/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../user.service';
import { User } from '../Schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }
  
  @Get()
  allUsers(): Promise<User[]> {
    return this.userService.getAll()
  }

  @Get(':email')
  getEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email)
  }

  @Patch(':id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
    return this.userService.update(updateUserDto, id)
  }

}
