import { Book } from 'src/books/entities/book.entity';
import { Chapter } from 'src/books/entities/chapter.entity';
import { BookRefactor1687860188734 } from 'src/migrations/1687860188734-BookRefactor';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Book, Chapter],
  migrations: [BookRefactor1687860188734],
});
