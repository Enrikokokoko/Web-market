/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Order } from '../../src/order/schema/order.schema';
import { OrderService } from '../../src/order/service/order.service';
import { orderMock } from '../mocks';
import { UserService } from '../../src/user/service/user.service';
import { User } from '../../src/user/Schema/user.schema';
import { ProductService } from '../../src/product/product.service';
import { Product } from '../../src/product/schema/product.schema';

const orderModelMock = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
};

const userModelMock = {
    findOne: jest.fn((x) => x),
    updateOne: jest.fn(),
}

const productModelMock = {
    find: jest.fn(() => []),
}

describe('Gives OrderService', () => {
    let service: OrderService;
    let model: Model<Order>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                OrderService,
                { provide: getModelToken(Order.name, 'order'), useValue: orderModelMock },
                UserService,
                { provide: getModelToken(User.name, 'user'), useValue: userModelMock},
                ProductService,
                { provide: getModelToken(Product.name, 'product'), useValue: productModelMock}
            ]
        }).compile();

        service = module.get(OrderService);
        model = module.get(getModelToken(Order.name, 'order'));

    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('When getAll is called', () => {
        let result: Order[];

        beforeAll(async () => {
            jest.spyOn(model, 'find').mockReturnValue({
                exec: jest.fn().mockReturnValue([orderMock])
            } as any)

            result = await service.getAll();
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then result is correct', () => {
            expect(result).toEqual([orderMock]);
        });

        it('Then find is called once', () => {
            expect(orderModelMock.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('When getById is called correct', () => {
        let result: Order;

        beforeAll(async () => {
            jest.spyOn(model, 'findById').mockReturnValue({
                exec: jest.fn().mockReturnValue(orderMock)
            } as any)

            result = await service.getById('id');
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then result is correct', () => {
            expect(result).toEqual(orderMock);
        });

        it('Then findById is called once', () => {
            expect(orderModelMock.findById).toHaveBeenCalledTimes(1);
        });

        it('Then findById is called with correct id', () => {
            expect(orderModelMock.findById).toHaveBeenCalledWith('id');
        });
    });

    describe('When update is called correct', () => {
        let result: Order;

        beforeAll(async () => {
            jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue(orderMock as any);

            result = await service.update(orderMock, 'id')
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then result is correct', () => {
            expect(result).toEqual(orderMock)
        })

        it('Then findByIdAndUpdate is called once', () => {
            expect(orderModelMock.findByIdAndUpdate).toHaveBeenCalledTimes
        });

        it('then findByIdAndUpdate is called with corred id and update', () => {
            expect(orderModelMock.findByIdAndUpdate).toHaveBeenCalledWith('id', orderMock, { new: true })
        });
    });

    describe('When create is called correct', () => {
        let result: Order;

        beforeAll(async () => {
            jest.spyOn(model, 'create').mockReturnValue(orderMock as any);

            result = await service.create(orderMock);
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then create is correct', () => {
            expect(result).toEqual(orderMock)
        });

        it('Then create is called once', () => {
            expect(orderModelMock.create).toHaveBeenCalledTimes(1);
        });

        it('Then create is called with correct arguments', () => {
            expect(orderModelMock.create).toHaveBeenCalledWith(expect.objectContaining({
                products: orderMock.products,
                userId: orderMock.userId,
            }))
        })
    });
});