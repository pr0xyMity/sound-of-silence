import { IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly author: string;
}
