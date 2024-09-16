import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  create() {
    return 'Product created successfully';
  }

  findAll() {
    return ['Product 1', 'Product 2', 'Product 3'];
  }

  findOne(id: number) {
    return `Product with ID ${id}`;
  }

  update(id: number, updateData: any) {
    return `Product with ID ${id} updated`;
  }

  delete(id: number) {
    return `Deleted product with ID ${id}`;
  }
}
