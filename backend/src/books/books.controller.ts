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
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  @Public()
  getBooks(@Query() paginationQueryDto: PaginationQueryDto): Promise<Book[]> {
    return this.bookService.getAll(paginationQueryDto);
  }

  @Get(':id')
  @Public()
  getBook(@Param('id') id: string) {
    return this.bookService.getOne(id);
  }

  @Post()
  @Public()
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
