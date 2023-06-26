import { Controller, Get } from '@nestjs/common';
import { BookService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(): string {
    return this.bookService.getBooks();
  }
}
