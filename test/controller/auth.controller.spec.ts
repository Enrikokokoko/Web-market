/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/controller/auth.controller';
import { AuthService } from '../../src/auth/service/auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let registr: jest.Mock;
    let signIn: jest.Mock;

    beforeAll(async () => {
        registr = jest.fn().mockReturnValue({
            username: 'string',
            password: 'string',
        });

        signIn = jest.fn().mockReturnValue({
           accessToken: 'test:accessToken'
        });

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{
                provide: AuthService,
                useValue: {
                    registration: registr,
                    signIn: signIn,
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
            expect(registr).toHaveBeenCalledTimes(1);
            expect(registr).toHaveBeenCalledWith(authData);
            expect(auth).toEqual(authData);

        })
    })

    describe('login', () => {
        it('Should call singIn method in service', async () => {
          const authData = {
            username: 'string',
            password: 'string',
          };
          const auth = await authController.login(authData);
          expect(signIn).toHaveBeenCalledTimes(1);
          expect(signIn).toHaveBeenCalledWith(authData.username, authData.password);
          expect(auth).toEqual({
            accessToken: 'test:accessToken'
         });
        });
      });
})