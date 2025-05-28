import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

import { CreateMilestoneHandler } from './application/handlers/create-milestone.handler';
import { FindMilestonesHandler } from './application/handlers/find-milestones.handler';
import { GetMilestoneHandler } from './application/handlers/get-milestone.handler';
import { HelloWorldHandler } from './application/handlers/hello-world.handler';
import { Milestone } from './domain/entities/milestone.entity';
import { MilestoneRepository } from './infrastructure/repositories/milestone.repository';
import { AppController } from './presentation/http/app.controller';
import { MilestonesController } from './presentation/http/milestones/milestones.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Milestone]),
  ],
  controllers: [AppController, MilestonesController],
  providers: [
    {
      provide: Logger,
      useValue: new Logger(),
    },
    CreateMilestoneHandler,
    FindMilestonesHandler,
    GetMilestoneHandler,
    HelloWorldHandler,
    MilestoneRepository,
  ],
})
export class AppModule {}
