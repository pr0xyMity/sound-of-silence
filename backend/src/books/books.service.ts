import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Chapter } from './entities/chapter.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  getAll(limit = 0, offset = 10): Promise<Book[]> {
    return this.bookRepository.find({ relations: { chapters: true } });
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

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const chapters = await Promise.all(
      createBookDto.chapters.map((chapter) => this.preloadChapter(chapter)),
    );
    const book = this.bookRepository.create({ ...createBookDto, chapters });
    return this.bookRepository.save(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const chapters =
      updateBookDto.chapters &&
      (await Promise.all(
        updateBookDto.chapters.map((chapter) => this.preloadChapter(chapter)),
      ));
    const book = await this.bookRepository.preload({
      id: +id,
      ...updateBookDto,
      chapters,
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

  private async preloadChapter(chapter: Chapter): Promise<Chapter> {
    const existingChapter = await this.chapterRepository.findOne({
      where: { title: chapter.title },
    });
    if (existingChapter) {
      throw existingChapter;
    }
    return this.chapterRepository.create(chapter);
  }
}
