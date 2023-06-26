import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(): string[] {
    return this.bookService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.bookService.getBook(id);
  }

  @Post()
  create(@Body() body) {
    return this.bookService.createBody(body);
  }
}
