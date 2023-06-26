import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  getBooks(): string[] {
    return ['Book 1', 'Book 2', 'Book 3'];
  }

  getBook(id: string): string {
    return `Book with id - ${id}`;
  }

  createBody(body) {
    return body;
  }
}
