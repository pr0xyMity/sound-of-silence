import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getBooks(@Query() paginationQuery): Book[] {
    const { limit, offset } = paginationQuery;
    return this.bookService.getBooks(limit, offset);
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
