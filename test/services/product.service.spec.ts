/* eslint-disable prettier/prettier */
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { Product } from '../../src/product/schema/product.schema';
import { ProductService } from '../../src/product/product.service';
import { productMock } from '../mocks';


const productModelMock = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
};

describe('Given ProductService', () => {
    let service: ProductService;
    let model: Model<Product>

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProductService,
                { provide: getModelToken(Product.name, 'product'), useValue: productModelMock }
            ]
        }).compile();

        service = module.get(ProductService);
        model = module.get(getModelToken(Product.name, 'product'));

    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('When create is correct', () => {
        let result: Product;

        beforeAll(async () => {
            jest.spyOn(model, 'create').mockReturnValue(productMock as any);

            result = await service.create(productMock)
        })

        afterAll(() => {
            jest.clearAllMocks();
        })

        it('Then create is correct', () => {
            expect(result).toEqual(productMock);
        });

        it('Then create is called once', () => {
            expect(productModelMock.create).toHaveBeenCalledTimes(1);
        });

        it('Then create is called with correct argum', () => {
            expect(productModelMock.create).toHaveBeenCalledWith(expect.objectContaining({
                name: 'test:name',
                price: 0,
                description: 'test:description',
            }));
        });
    });

    describe('When getAll is correct', () => {
        let result: Product[];

        beforeAll(async () => {
            jest.spyOn(model, 'find').mockReturnValue({
                exec: jest.fn().mockReturnValue([productMock])
            } as any)

            result = await service.getAll();
        });

        afterAll(() => {
            jest.clearAllMocks();
        })

        it('Then create is correct', () => {
            expect(result).toEqual([productMock]);
        });

        it('Then create is called once', () => {
            expect(productModelMock.find).toHaveBeenCalledTimes(1);
        });
    });


    describe('When getById is correct', () => {
        let result: Product;

        beforeAll(async () => {
            jest.spyOn(model, 'findById').mockReturnValue({
                exec: jest.fn().mockReturnValue(productMock)
            } as any)

            result = await service.getById('id');
        });

        afterAll(() => {
            jest.clearAllMocks()
        });

        it('Then result is correct', () => {
            expect(result).toEqual(productMock)
        });

        it('Then findById is called once', () => {
            expect(productModelMock.findById).toHaveBeenCalledTimes(1);
        });

        it('Then findById is called with correct id', () => {
            expect(productModelMock.findById).toHaveBeenCalledWith('id')
        });
    });

    describe('When updateById is correct', () => {
        let result: Product;

        beforeAll(async () => {
            jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue(productMock as any)

            result = await service.updateById(productMock, 'id');
        });

        afterAll(() => {
            jest.clearAllMocks();
        })

        it('Then result is correct', () => {
            expect(result).toEqual(productMock);
        });

        it('Then findByIdAndUpdate is called once', () => {
            expect(productModelMock.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        })

        it('Then findByIdAndUpdate is called with correct id and update', () => {
            expect(productModelMock.findByIdAndUpdate).toHaveBeenCalledWith('id', productMock, { new: true })
        })
    });
});