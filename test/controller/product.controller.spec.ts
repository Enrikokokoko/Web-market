/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/product/controller/product.controller';
import { ProductService } from '../../src/product/product.service';

describe('ProductController', () => {
  let productController: ProductController;
  let getAllMock: jest.Mock;
  let getByMock: jest.Mock;
  let createMock: jest.Mock;
  let updateMock: jest.Mock;

  beforeAll(async () => {
    getAllMock = jest.fn().mockReturnValue([{}]);
    getByMock = jest.fn().mockReturnValue({id: 1});
    createMock = jest.fn().mockReturnValue({
        name: 'string',
        price: 1,
        description: 'string',
    });
    updateMock = jest.fn().mockReturnValue({
        id: 10,
        name: 'string',
        price: 1,
        description: 'string',
    });

    const module: TestingModule = await Test.createTestingModule({
        controllers: [ProductController],
        providers: [{ 
            provide: ProductService, 
            useValue: {
                getAll: getAllMock, 
                getById: getByMock,
                create: createMock,
                updateById: updateMock,
            }
        }]
    }).compile();

    productController = module.get<ProductController>(ProductController);
  });
  
 describe('allProducts', () => {
    it('Should call getAll method in service', async () => {
        const products = await productController.getAllProducts();

        expect(getAllMock).toHaveBeenCalledTimes(1);
        expect(products).toHaveLength(1);
    });
  }); 

 describe('getProductById', () => {
    it('Should call getById method in service', async () => {
        const product = await productController.getProductById('id');

        expect(getByMock).toHaveBeenCalledTimes(1);
        expect(product).toEqual({id: 1});
    });
  });
 
 describe('createProduct', () => {
    it('Should call create method in service', async () => {
        const product = await productController.createProduct({
         name: 'string',
         price: 1,
         description: 'string',
        });

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(product).toEqual(product);
    });
  });

 describe('updateProductById', () => {
    it('Should call update method on service', async () => {
        const product = await productController.updateProductById({
         name: 'string',
         price: 1,
         description: 'string',
        }, 'id');

        expect(updateMock).toHaveBeenCalledTimes(1);
        expect(product).toHaveProperty('id');
        expect(product).toEqual(product);
    }); 
  });
});
