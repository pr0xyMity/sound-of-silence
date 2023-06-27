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
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getBooks(@Query() paginationQuery): Promise<Book[]> {
    const { limit, offset } = paginationQuery;
    return this.bookService.getAll(limit, offset);
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.bookService.getOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  updateWhole(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
