import { IsObject, IsString } from 'class-validator';
import { Chapter } from '../entities/chapter.entity';

export class CreateBookDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly author: string;
  @IsObject({ each: true })
  readonly chapters: Chapter[];
}
