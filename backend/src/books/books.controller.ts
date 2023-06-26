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
import { UpdateWholeBookDto } from './dto/update-whole-book.dto/update-whole-book.dto';

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
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBody(createBookDto);
  }

  @Put(':id')
  updateWhole(
    @Param('id') id: string,
    @Body() updateWholeBookDto: UpdateWholeBookDto,
  ) {
    return this.bookService.updateWhole(id, updateWholeBookDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
