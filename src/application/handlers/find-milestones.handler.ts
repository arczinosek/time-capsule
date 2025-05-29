import { Injectable, Logger } from '@nestjs/common';

import { MilestoneRepository } from '@/infrastructure/repositories/milestone.repository';

import { FindMilestonesQuery } from '../queries';

@Injectable()
export class FindMilestonesHandler {
  constructor(
    private readonly repository: MilestoneRepository,
    private readonly logger: Logger
  ) {}

  async handle({ limit, page }: FindMilestonesQuery) {
    try {
      return await this.repository.find({
        take: limit,
        skip: (page - 1) * limit,
      });
    } catch (error) {
      this.logger.warn('Find milestones repository error', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error,
      });

      throw new Error('Find milestones repository failed!');
    }
  }
}
