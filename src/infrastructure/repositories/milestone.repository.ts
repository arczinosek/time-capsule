import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Milestone } from '@/domain/entities/milestone.entity';

@Injectable()
export class MilestoneRepository extends Repository<Milestone> {
  constructor(dataSource: DataSource) {
    super(Milestone, dataSource.createEntityManager());
  }
}
