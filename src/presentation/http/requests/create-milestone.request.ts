import {
  IsDateString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const REGEX_DATE = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

export class CreateMilestoneRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(127)
  title: string;

  @IsString()
  description: string;

  @IsDateString(
    { strict: true },
    { message: 'dateStart must be a valid date string' }
  )
  @Matches(REGEX_DATE, { message: 'dateStart must be a valid date string' })
  dateStart: string;

  @IsDateString(
    { strict: true },
    { message: 'dateFinish must be a valid date string' }
  )
  @Matches(REGEX_DATE, { message: 'dateFinish must be a valid date string' })
  dateFinish: string;
}
