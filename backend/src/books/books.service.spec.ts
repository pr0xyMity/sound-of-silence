import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Chapter } from './entities/chapter.entity';
import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('BooksService', () => {
  let service: BooksService;
  let bookRepository: MockRepository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Book), useValue: createMockRepository() },
        {
          provide: getRepositoryToken(Chapter),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepository = module.get<MockRepository>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when book with ID exists', () => {
      it('should return the book object', async () => {
        // Arrange
        const bookId = '1';
        const expectedBook = {};
        bookRepository.findOne.mockReturnValue(expectedBook);

        // Act
        const book = await service.findOne(bookId);

        // Assert
        expect(book).toEqual(expectedBook);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        // Arrange
        const bookId = '1';
        bookRepository.findOne.mockReturnValue(undefined);

        try {
          // Act
          await service.findOne(bookId);
          expect(true).toEqual(false);
        } catch (err) {
          // Assert
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Book #${bookId} not found`);
        }
      });
    });
  });
});
