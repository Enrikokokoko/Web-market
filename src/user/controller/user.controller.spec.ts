/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let userController: UserController;
  let getAllMock: jest.Mock;
  let createMock: jest.Mock;
  let getByMock: jest.Mock;
  let updateMock: jest.Mock;

  beforeAll(async () => {
    getAllMock = jest.fn().mockReturnValue([{}]);
    getByMock = jest.fn().mockReturnValue({email: 'qwe@qwe.qwe'});
    createMock = jest.fn().mockReturnValue({     
      email: 'string',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      balance: 1,
      password: 'string',
    }) 
    updateMock = jest.fn().mockReturnValue({
      id: 12,
      email: 'string',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      balance: 1,
      password: 'string',
    },)


    const module: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [{ provide: UserService, useValue: { 
          getAll: getAllMock, 
          getUserByEmail: getByMock, 
          create: createMock,
          update: updateMock
        }}],
    }).compile();

    userController = module.get<UserController>(UserController);
  })

  describe('allUsers', () => {
  it('Should return an array of user', async () => {
    const users = await userController.allUsers();

    expect(getAllMock).toHaveBeenCalledTimes(1);
    expect(users).toHaveLength(1)
  })
  })

  describe('createUser', () => {
    it('Should return created user', async () => {
      const user = await userController.createUser({     
        email: 'string',
        username: 'string',
        firstName: 'string',
        lastName: 'string',
        balance: 1,
        password: 'string',
    })

      expect(createMock).toHaveBeenCalledTimes(1);
      expect(user).toEqual(user)
    })
  })


  describe('getEmail', () => {
    it('Should return user by email', async () => {
      const user = await userController.getEmail('email');
      
      expect(getByMock).toHaveBeenCalledTimes(1);
      expect(user).toEqual({email: 'qwe@qwe.qwe'});
    })
  })

  describe('updateUser', () => {
    it('Should return updated user', async () => {
      const user = await userController.updateUser({
        email: 'string',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      balance: 1,
      password: 'string',
      }, 'id');

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(user).toHaveProperty('id');
      expect(user).toEqual(user);    
    })
  })
});

