import { IsObject, IsString } from 'class-validator';
import { Chapter } from '../entities/chapter.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The sound of silence',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'The main author of the book',
    example: 'John Doe',
  })
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: 'The sound chapters of the book',
    example: [],
  })
  @IsObject({ each: true })
  readonly chapters: Chapter[];
}
