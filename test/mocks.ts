/* eslint-disable prettier/prettier */
import { Product } from '../src/product/schema/product.schema';
import { User } from '../src/user/Schema/user.schema';
import { Order } from '../src/order/schema/order.schema';

export const userMock: User = {
    email: 'test@email.com',
    username: 'test:username',
    password: 'test:password',
    firstName: 'test:firstName',
    lastName: 'test:lastName',
    balance: 1111,
    createdAt: new Date()
};

export const productMock: Product = {
    name: 'test:name',
    price: 0,
    description: 'test:description',
    createdAt: new Date()
}

export const orderMock = {
    products: [],
    userId: 1,
    createdAt: new Date()
}

export const authMock = {
    username:'test:name',
    password: 'test:password'
}