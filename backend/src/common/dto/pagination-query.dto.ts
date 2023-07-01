import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    example: 0,
  })
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
