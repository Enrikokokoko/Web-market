/* eslint-disable prettier/prettier */
export class UpdateOrderDto {
    readonly id: number;
    readonly createdAt: number;
    readonly poducts: number | Array<object>;
    readonly userId: number;
  }
  