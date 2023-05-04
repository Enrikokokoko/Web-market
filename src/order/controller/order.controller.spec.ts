/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { UserService } from '../../user/service/user.service';
import { JwtModule } from '@nestjs/jwt';

describe('OrderController', () => {
  let orderController: OrderController;
  let getAllMock: jest.Mock;
  let getMockById: jest.Mock;
  let createMock: jest.Mock;
  let updateMock: jest.Mock;

  beforeAll(async () => {
    getAllMock = jest.fn().mockReturnValue([{}]);
    getMockById = jest.fn().mockReturnValue({id: 911});
    createMock = jest.fn().mockReturnValue({products: [], user: {}});
    updateMock = jest.fn().mockReturnValue({
      products: [],
      id: 911,
    });

    const module: TestingModule = await Test.createTestingModule({
        controllers: [OrderController],
        providers: [{
                      provide: OrderService,
        useValue: {
               getAll: getAllMock,
               getById: getMockById,
               create: createMock,
               update: updateMock,
              }
              }, {
              provide: UserService,
              useValue: {}
              }

        ],
        imports: [JwtModule],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
  });

  describe('getAllOrders', () => {
    it('Should call getAll method in service', async () => {
      const order = await orderController.getAllOrders()

      expect(getAllMock).toHaveBeenCalledTimes(1);
      expect(order).toHaveLength(1)
    });
  });

  describe('getOrderById', () => {
    it('Should call gerById method in service', async () => {
      const order = await orderController.getOrderById('id');

      expect(getMockById).toHaveBeenCalledTimes(1);
      expect(order).toEqual({id: 911});
    });
  });

  describe('create', () => {
    it('Should call create method in service', async () => {
      const orderBody = {
        products: [],
        userId: '1',
      }; 
      const userId = {
        user: { userId: '123123' } 
      }

      const order = await orderController.create(orderBody, userId);
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(order).toEqual({products: [], user: {}});
    });
  });

  describe('update', () => {
    it('Should call update method in service', async () => {
      const orderUpdateBody = {
        id: 911,
        products: [],
      };

      const order = await orderController.updateOrderById(orderUpdateBody, 'id');
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(order).toHaveProperty('id');
      expect(order).toEqual(orderUpdateBody);
    });
  });
});