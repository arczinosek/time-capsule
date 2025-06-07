import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import dataSourceOptions from '../db/data-source';
import { HelloModule } from './hello/hello.module';
import { MilestoneModule } from './milestone/milestone.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MilestoneModule,
    HelloModule,
  ],
  providers: [
    {
      provide: Logger,
      useValue: new Logger(),
    },
  ],
})
export class AppModule {}
