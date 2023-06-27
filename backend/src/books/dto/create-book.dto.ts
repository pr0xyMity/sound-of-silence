import { IsObject, IsString } from 'class-validator';
import { Chapter } from '../entities/chapter.entity';

export class CreateBookDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly author: string;
  @IsObject({ each: true })
  readonly chapters: Chapter[];
}
