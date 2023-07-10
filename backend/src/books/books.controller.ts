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
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  @Public()
  find(@Query() paginationQueryDto: PaginationQueryDto): Promise<Book[]> {
    return this.bookService.find(paginationQueryDto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
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
