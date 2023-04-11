/* eslint-disable prettier/prettier */
export class CreateOrderDto {
  readonly id: number;
  readonly createdAt: number;
  readonly poducts: number | Array<object>;
  readonly userId: number;
}
