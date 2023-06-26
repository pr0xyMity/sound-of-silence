import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  updateWhole(@Param('id') id: string, @Body() body) {
    return this.bookService.updateWhole(id, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
