import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CreateMilestoneCommand } from '../../../application/commands';
import { CreateMilestoneHandler } from '../../../application/handlers/create-milestone.handler';
import { FindMilestonesHandler } from '../../../application/handlers/find-milestones.handler';
import { GetMilestoneHandler } from '../../../application/handlers/get-milestone.handler';
import {
  FindMilestonesQuery,
  GetMilestoneQuery,
} from '../../../application/queries';
import { InvalidPeriodError } from '../../../domain/errors';
import { CreateMilestoneRequest, FindMilestonesRequest } from '../requests';
import { MilestoneResponse } from '../responses';

@Controller('/api/milestones')
export class MilestonesController {
  constructor(
    private readonly createMilestoneHandler: CreateMilestoneHandler,
    private readonly findMilestonesHandler: FindMilestonesHandler,
    private readonly getMilestoneHandler: GetMilestoneHandler,
    private readonly logger: Logger
  ) {}

  @Get()
  async find(@Query() { page, limit }: FindMilestonesRequest) {
    try {
      const milestones = await this.findMilestonesHandler.handle(
        new FindMilestonesQuery(page, limit)
      );

      return {
        milestones: milestones.map((entity) =>
          MilestoneResponse.createFromEntity(entity)
        ),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const milestone = await this.getMilestoneHandler.handle(
      new GetMilestoneQuery(id)
    );

    if (!milestone) {
      throw new NotFoundException('Milestone not found!');
    }

    return MilestoneResponse.createFromEntity(milestone);
  }

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
          'Invalid period: finish date can not be before start date'
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.logger.warn('An unknown error was thrown', { error });

      throw error;
    }
  }
}
