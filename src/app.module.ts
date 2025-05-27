import { Logger, Module } from '@nestjs/common';
import { AppController } from './presentation/http/app.controller';
import { HelloWorldHandler } from './application/handlers/hello-world.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { MilestonesController } from './presentation/http/milestones/milestones.controller';
import { CreateMilestoneHandler } from './application/handlers/create-milestone.handler';
import { MilestoneRepository } from './infrastructure/repositories/milestone.repository';
import { Milestone } from './domain/entities/milestone.entity';

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
    HelloWorldHandler,
    CreateMilestoneHandler,
    MilestoneRepository,
  ],
})
export class AppModule {}
