import { ApiProperty } from '@nestjs/swagger';

// ItemResponseDto - Class cho các item trong order
class ItemResponseDto {
  @ApiProperty({ type: String, example: 'Router' })
  name: string;

  @ApiProperty({ type: Number, example: 12 })
  productId: number;

  @ApiProperty({ type: Number, example: 80 })
  price: number;

  @ApiProperty({ type: Number, example: 3 })
  quantity: number;
}

class OrderResponseDto {
  @ApiProperty({
    type: String,
    example: '4d04aa8a-1960-408d-aa67-36ed4d483795',
  })
  id: string;

  @ApiProperty({ type: Number, example: 310 })
  total: number;

  @ApiProperty({ type: Number, example: 6 })
  numItems: number;

  @ApiProperty({ type: String, example: 'PENDING' })
  status: string;

  @ApiProperty({ type: String, example: null })
  stripePaymentId: string;

  @ApiProperty({ type: Boolean, example: null })
  paid: boolean;

  @ApiProperty({ type: String, example: null })
  paidAt: string;

  @ApiProperty({ type: String, example: '2024-10-03T08:00:59.368Z' })
  createdAt: string;

  @ApiProperty({ type: String, example: '2024-10-03T08:00:59.368Z' })
  updatedAt: string;

  // Thêm mảng items vào OrderResponseDto
  @ApiProperty({
    type: [ItemResponseDto],
    example: [
      {
        name: 'Router',
        productId: 12,
        price: 80,
        quantity: 3,
      },
      {
        name: 'Base para laptop',
        productId: 33,
        price: 25,
        quantity: 2,
      },
      {
        name: 'Estuche para tablet',
        productId: 29,
        price: 20,
        quantity: 1,
      },
    ],
  })
  items: ItemResponseDto[];
}

class PaymentSessionResponseDto {
  @ApiProperty({
    type: String,
    example:
      'https://checkout.stripe.com/c/pay/cs_test_b1PQPdgZ7rEiH3l3wgVlGbxzuUsejNBLszBk0KgUuBJ1B764vg87vseGy8#fidkdWxOYHwnPyd1blpxYHZxWjA0VDVnXzFEamZ1SGxxU3JhPFRVS3A9T29sc0JGT0dDdHVHVkJhVX9oRGBkcl9EM1BqazNUQH9tRHQ3UjNoSlZcYkxCM3x0c09tY1BjM0FBQWpuVmRsdjRqNTVdPGddQGA8YycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl',
  })
  sessionUrl: string;

  @ApiProperty({
    type: String,
    example: 'http://localhost:6001/payments/success',
  })
  successUrl: string;

  @ApiProperty({
    type: String,
    example: 'http://localhost:6001/payments/cancel',
  })
  cancelUrl: string;
}

class DataResponseDto {
  @ApiProperty({ type: OrderResponseDto })
  order: OrderResponseDto;

  @ApiProperty({ type: PaymentSessionResponseDto })
  paymentSession: PaymentSessionResponseDto;
}

export class CreateOrderResponseDto {
  @ApiProperty({ type: String, example: 'success' })
  status: string;

  @ApiProperty({ type: DataResponseDto })
  data: DataResponseDto;
}
