import { Type } from 'class-transformer';
import { IsInt, IsPositive, Max } from 'class-validator';

import { FindMilestonesQuery } from '../../../application/queries';

export class FindMilestonesRequest {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly page: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(FindMilestonesQuery.LIMIT_MAX)
  readonly limit: number;

  constructor(
    page: number = 1,
    limit: number = FindMilestonesQuery.LIMIT_DEFAULT
  ) {
    this.page = page;
    this.limit = limit;
  }
}
