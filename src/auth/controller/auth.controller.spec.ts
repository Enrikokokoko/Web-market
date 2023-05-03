/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let registrAndLoginMock: jest.Mock;

    beforeAll(async () => {
        registrAndLoginMock = jest.fn().mockReturnValue({
            username: 'string',
            password: 'string',
        })

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{
                provide: AuthService,
                useValue: {
                    registration: registrAndLoginMock,
                    signIn: registrAndLoginMock,
                }
            }]
        }).compile();

        authController = module.get<AuthController>(AuthController);
    });

    describe('registr', () => {
        it('Should call registration method in service', async () => {
            const authData = {
                username: 'string',
                password: 'string',
            };
            const auth = await authController.registr(authData)
            expect(registrAndLoginMock).toHaveBeenCalledTimes(1);
            expect(registrAndLoginMock).toHaveBeenCalledWith(authData);
            expect(auth).toEqual(authData);

        })
    })

    describe('login', () => {
        it('Should call singIn method in service', async () => {
            const authData = {
                username: 'string',
                password: 'string',
            };
            const auth = await authController.login(authData)
            expect(registrAndLoginMock).toHaveBeenCalledTimes(2);
            expect(registrAndLoginMock).toHaveBeenCalledWith(authData);
            expect(auth).toEqual(authData);
        })
    })
})