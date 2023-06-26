import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  //
  // Mocking books data for service layer testing
  //
  private books: Book[] = [
    {
      id: '1',
      name: "Dante's Inferno",
      author: 'Dante Alighieri',
    },
    {
      id: '2',
      name: 'Name of the Wind',
      author: 'Patrick Rothfuss',
    },
  ];

  getBooks(limit = 0, offset = 0): Book[] {
    return this.books.slice(offset, this.books.length + limit);
  }

  getBook(id: string): Book {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with id: ${id}`);
    }
    return book;
  }

  createBody(body): Book {
    return Book.fromJSON(body);
  }

  updateWhole(id: string, body): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    this.books[bookIndex] = Book.fromJSON(body);
  }

  update(id: string, body): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    this.books[bookIndex] = { ...this.books[bookIndex], ...body };
  }

  delete(id: string): void {
    this.books.filter((book) => book.id !== id);
  }
}
