import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Chapter } from './entities/chapter.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    private readonly dataSource: DataSource,
  ) {}

  getAll(paginationQueryDto: PaginationQueryDto): Promise<Book[]> {
    const { limit, offset } = paginationQueryDto;
    return this.bookRepository.find({
      relations: { chapters: true },
      skip: offset,
      take: limit,
    });
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

  async recommendBook(book: Book): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      book.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_book';
      recommendEvent.type = 'book';
      recommendEvent.payload = { bookId: book.id };

      await queryRunner.manager.save(book);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
