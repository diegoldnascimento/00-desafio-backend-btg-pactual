export interface CreateOrderInputDto {
  orderId: string;
  clientId: string;
  orderItems: [];
}

export type CreateOrderOutputDto = void;
