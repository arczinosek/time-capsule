import { Milestone } from '@/domain/entities/milestone.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MilestoneRepository extends Repository<Milestone> {
  constructor(dataSource: DataSource) {
    super(Milestone, dataSource.createEntityManager());
  }
}
