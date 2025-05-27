import { Injectable, Logger } from '@nestjs/common';

import { Milestone } from '@/domain/entities/milestone.entity';
import { MilestoneRepository } from '@/infrastructure/repositories/milestone.repository';

import { CreateMilestoneCommand } from '../commands';

@Injectable()
export class CreateMilestoneHandler {
  constructor(
    private readonly milestoneRepository: MilestoneRepository,
    private readonly logger: Logger
  ) {}

  async handle(command: CreateMilestoneCommand): Promise<Milestone> {
    const milestone = Milestone.create(
      command.title,
      command.description,
      command.dateStart,
      command.dateFinish
    );

    const res = await this.milestoneRepository.save(milestone);

    this.logger.log('milestone created', {
      id: res.id,
      createdAt: res.getCreatedAt(),
    });

    return res;
  }
}
