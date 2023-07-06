import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Chapter } from './entities/chapter.entity';
import { DataSource } from 'typeorm';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        BooksController,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Book), useValue: {} },
        { provide: getRepositoryToken(Chapter), useValue: {} },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
