import { IsString } from 'class-validator';

export class UpdateWholeBookDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly author: string;
}
