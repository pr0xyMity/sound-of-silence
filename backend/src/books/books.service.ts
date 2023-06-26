import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  getBooks(): string {
    return 'Books list';
  }
}
