import { Injectable, Logger } from '@nestjs/common';

import { Milestone } from '@/domain/entities/milestone.entity';
import { MilestoneRepository } from '@/infrastructure/repositories/milestone.repository';

import { GetMilestoneQuery } from '../queries';

@Injectable()
export class GetMilestoneHandler {
  constructor(
    private readonly repository: MilestoneRepository,
    private readonly logger: Logger
  ) {}

  async handle({ id }: GetMilestoneQuery): Promise<Milestone | null> {
    try {
      return await this.repository.findOneBy({ id });
    } catch (error) {
      this.logger.warn('Get milestone repository error', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error,
      });

      throw new Error('Get milestone repository failed!');
    }
  }
}
