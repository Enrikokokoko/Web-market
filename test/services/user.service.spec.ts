/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { User } from '../../src/user/Schema/user.schema';
import { UserService } from '../../src/user/service/user.service';
import { userMock } from '../mocks';


const userModelMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
};

describe('Given UserService', () => {
    let service: UserService;
    let model: Model<User>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: getModelToken(User.name, 'user'), useValue: userModelMock }
            ]
        }).compile();

        service = module.get(UserService);
        model = module.get(getModelToken(User.name, 'user'));

    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('When getAll is called', () => {
        let result: User[];

        beforeAll(async () => {
            jest.spyOn(model, 'find').mockReturnValue({
                exec: jest.fn().mockReturnValue([userMock])
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

    describe('When getUserByEmail is called', () => {
        let result: User;

        beforeAll(async () => {
            jest.spyOn(model, 'findOne').mockReturnValue({
                exec: jest.fn().mockReturnValue(userMock)
            } as any );

            result = await service.getUserByEmail('email');
        });

        afterAll(() => {
            jest.clearAllMocks()
        })
        
        it('Then result is correct', () => {
            expect(result).toEqual(userMock)
        })

        it('Then findOne is called once', () => {
            expect(userModelMock.findOne).toHaveBeenCalledTimes(1);
        })

        it('Then findOne is called with correct email', () => {
            expect(userModelMock.findOne).toHaveBeenCalledWith({email: 'email'})
        })

    })

    describe('When update is called', () => {
        let result: User;

        beforeAll(async () => {

            jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue(userMock as any)

            result = await service.update(userMock, 'id')
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then result is correct', () => {
            expect(result).toEqual(userMock);
        });

        it('Then findByIdAndUpdate is called once', () => {
            expect(userModelMock.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        });

        it('Then findByIdAndUpdate is called with correct id and update', () => {
            expect(userModelMock.findByIdAndUpdate).toHaveBeenCalledWith('id', userMock, { new: true })
        })
    })

    describe('When create is called correct', () => {
        let result: User;

        beforeAll(async () => {
            jest.spyOn(model, 'create').mockReturnValue(userMock as any);

            result = await service.create(userMock);
        });
        
        afterAll(() => {
            jest.clearAllMocks();
        })

        it('Then create is correct', () => {
            expect(result).toEqual(userMock);
        });

        it('Then create is called once', () => {
            expect(userModelMock.create).toHaveBeenCalledTimes(1);
        })

        it('Then create is called with correct arguments', () => {
            expect(userModelMock.create).toHaveBeenCalledWith(expect.objectContaining({  
            email: userMock.email,
            username: userMock.username,
            password: '7f9cfdc981a35d1256097c70b656a03ac236916289af640eb6f17f3295984134',
            firstName: userMock.firstName,
            lastName: userMock.lastName,
            balance: userMock.balance,
            }));
        });
    });
});
