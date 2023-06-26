import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  getBooks(limit, offset): string[] {
    return ['Book 1', 'Book 2', 'Book 3', limit, offset];
  }

  getBook(id: string): string {
    return `Book with id - ${id}`;
  }

  createBody(body) {
    return body;
  }

  updateWhole(id: string, body) {
    return `Update whole with id ${id} - ${JSON.stringify(body)}`;
  }

  update(id: string, body) {
    return `Update with id ${id} - ${JSON.stringify(body)}`;
  }

  delete(id: string) {
    return `Deleted ${id}`;
  }
}
