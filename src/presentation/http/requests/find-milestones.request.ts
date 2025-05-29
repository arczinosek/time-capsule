import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

import { FindMilestonesQuery } from '@/application/queries';

export class FindMilestonesRequest {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(FindMilestonesQuery.LIMIT_MAX)
  @IsOptional()
  limit = FindMilestonesQuery.LIMIT_DEFAULT;
}
