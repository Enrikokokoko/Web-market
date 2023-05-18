/* eslint-disable prettier/prettier */
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AuthService } from '../../src/auth/service/auth.service';
import { User } from '../../src/user/Schema/user.schema';
import { authMock } from '../mocks';
import { JwtService } from '@nestjs/jwt';

const authModelMock = {
    signIn: jest.fn(x => x),
    findOne: jest.fn((x) => x),
    singAsync: jest.fn(),
    create: jest.fn()
};



describe('Gives AuthService', () => {
    let service: AuthService;
    let model: Model<User>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: getModelToken(User.name, 'auth'), useValue: authModelMock },
                JwtService,
                { provide: getModelToken(User.name, 'user'), useValue: authModelMock }
            ]
        }).compile();

        service = module.get(AuthService);
        model = module.get(getModelToken(User.name, 'auth'));
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('When registration is called correct', () => {
        let result: User;

        beforeAll(async () => {
            jest.spyOn(model, 'create').mockReturnValue(authMock as any)

            result = await service.registration(authMock)
        })

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then create is correct', () => {
            expect(result).toEqual(authMock);
        });

        it('Then create is called once', () => {
            expect(authModelMock.create).toHaveBeenCalledTimes(1)
        });

        it('Then create is called with correct argum', () => {
            expect(authModelMock.create).toHaveBeenCalledWith(expect.objectContaining({
                username: authMock.username,
                password: '7f9cfdc981a35d1256097c70b656a03ac236916289af640eb6f17f3295984134',
            }));
        });
    });

    describe('When signIn is called correct', () => {
        let result: User;


        beforeAll(async () => {
            jest.spyOn(model, 'findOne').mockReturnValue(authMock as any);

            result = await service.signIn(authMock.username, authMock.password);
        });

        

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then findOne is correct', () => {
            expect(result).toEqual(authMock)
        });

        // it('Then findOne is called once', () => {
        //     expect(authModelMock.findOne).toHaveBeenCalledTimes(1);
        // });
    });
});