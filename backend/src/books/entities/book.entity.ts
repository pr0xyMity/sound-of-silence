import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @JoinTable()
  @ManyToMany((type) => Chapter, (chapter) => chapter.books, { cascade: true })
  chapters: Chapter[];
}
