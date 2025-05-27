import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';

import { CreateMilestoneHandler } from '@/application/handlers/create-milestone.handler';
import { CreateMilestoneCommand } from '@/application/commands';
import { InvalidPeriodError } from '@/domain/errors';

import { CreateMilestoneRequest } from '../requests';
import { MilestoneResponse } from '../responses';

@Controller('/api/milestones')
export class MilestonesController {
  constructor(
    private readonly createMilestoneHandler: CreateMilestoneHandler,
    private readonly logger: Logger
  ) {}

  @Post()
  async create(
    @Body()
    { title, description, dateStart, dateFinish }: CreateMilestoneRequest
  ) {
    const addMilestoneCommand = new CreateMilestoneCommand(
      title,
      description,
      new Date(dateStart),
      new Date(dateFinish)
    );

    try {
      const entity =
        await this.createMilestoneHandler.handle(addMilestoneCommand);

      this.logger.log('New milestone successfully created', {
        id: entity.id,
      });

      return MilestoneResponse.createFromEntity(entity);
    } catch (error) {
      if (error instanceof InvalidPeriodError) {
        this.logger.log('Request resulted with InvalidPeriodError', {
          dateStart,
          dateFinish,
        });

        throw new BadRequestException(
          'Invalid period - finish date can not be before start date'
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.logger.warn('An unknown error was thrown', { error });

      throw error;
    }
  }
}
