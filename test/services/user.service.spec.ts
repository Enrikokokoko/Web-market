import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { User } from '../../src/user/Schema/user.schema';
import { UserService } from '../../src/user/service/user.service';
import { userMock } from '../mocks';

const userModelMock = {
  find: jest.fn(),
};

describe('Given UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken(User.name), useValue: userModelMock },
      ],
    }).compile();

    service = module.get(UserService);
    model = module.get(getModelToken(User.name));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('When getAll is called', () => {
    let result: User[];

    beforeAll(async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockReturnValue([userMock]),
      } as any);

      result = await service.getAll();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('Then result is correct', () => {
      expect(result).toEqual([userMock]);
    });

    it('Then find is called once', () => {
      expect(userModelMock.find).toHaveBeenCalledTimes(1);
    });
  });
});
