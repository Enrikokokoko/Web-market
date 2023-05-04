/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../service/user.service';

describe('UserController', () => {
  let userService: UserService;
  let getAllMock: jest.Mock;
  let createMock: jest.Mock;
  let getByMock: jest.Mock;
  let updateMock: jest.Mock;

  beforeAll(async () => {
    getAllMock = jest.fn().mockReturnValue([{}]);
    getByMock = jest.fn().mockReturnValue({ email: 'qwe@qwe.qwe' });
    createMock = jest.fn().mockReturnValue({     
      email: 'string',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      balance: 1,
      password: 'string',
    });
    updateMock = jest.fn().mockReturnValue({
      id: 12,
      email: 'string',
      username: 'string',
      firstName: 'string',
      lastName: 'string',
      balance: 1,
      password: 'string',
    });

    const module: TestingModule = await Test.createTestingModule({
        providers: [{ 
          provide: UserService, 
          useValue: { 
            getAll: getAllMock, 
            getUserByEmail: getByMock, 
            create: createMock,
            update: updateMock,
          }}],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('getAll', () => {
  it('Should return an array of user', async () => {
      const users = await userService.getAll();

      expect(getAllMock).toHaveBeenCalledTimes(1);
      expect(users).toHaveLength(1);
    });
  });

  describe('create', () => {
    it('Should return created user', async () => {
      const user = await userService.create({     
        email: 'string',
        username: 'string',
        firstName: 'string',
        lastName: 'string',
        balance: 1,
        password: 'string',
    });

      expect(createMock).toHaveBeenCalledTimes(1);
      expect(user).toEqual(user);
    });
  });


  describe('getUserByEmail', () => {
    it('Should return user by email', async () => {
      const user = await userService.getUserByEmail('email');
      
      expect(getByMock).toHaveBeenCalledTimes(1);
      expect(user).toEqual({email: 'qwe@qwe.qwe'});
    });
  });

  describe('update', () => {
    it('Should return updated user', async () => {
      const user = await userService.update({
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
    });
  });
});

