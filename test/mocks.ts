import { User } from '../src/user/Schema/user.schema';

export const userMock: User = {
  email: 'test@email.com',
  username: 'test:username',
  password: 'test:password',
  firstName: 'test:firstName',
  lastName: 'test:lastName',
  balance: 1111,
  createdAt: new Date(),
};
