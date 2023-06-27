import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAll(limit = 0, offset = 10): Promise<Book[]> {
    return await this.bookRepository.find({ relations: { chapters: true } });
  }

  async getOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: +id },
      relations: { chapters: true },
    });
    if (!book) {
      throw new NotFoundException(`Book with id: ${id}`);
    }
    return book;
  }

  create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto,
    });
    if (!book) {
      throw new NotFoundException(`Book with id: ${id}`);
    }
    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id: +id } });
    await this.bookRepository.remove(book);
  }
}
