import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BookService } from './books/books.service';

@Module({
  imports: [],
  controllers: [AppController, BooksController],
  providers: [AppService, BookService],
})
export class AppModule {}
