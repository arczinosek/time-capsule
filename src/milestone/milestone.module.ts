import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateMilestoneHandler } from './application/handlers/create-milestone.handler';
import { FindMilestonesHandler } from './application/handlers/find-milestones.handler';
import { GetMilestoneHandler } from './application/handlers/get-milestone.handler';
import { Milestone } from './domain/entities/milestone.entity';
import { MilestoneRepository } from './infrastructure/repositories/milestone.repository';
import { MilestonesController } from './presentation/http/controllers/milestones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Milestone])],
  controllers: [MilestonesController],
  providers: [
    {
      provide: Logger,
      useValue: new Logger('MilestoneModule'),
    },
    CreateMilestoneHandler,
    FindMilestonesHandler,
    GetMilestoneHandler,
    MilestoneRepository,
  ],
})
export class MilestoneModule {}
