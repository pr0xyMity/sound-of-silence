import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from '../create-book.dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
