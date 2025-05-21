import { Module } from '@nestjs/common';
import { AppController } from './presentation/http/app.controller';
import { HelloWorldHandler } from './application/handler/hello-world.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [HelloWorldHandler],
})
export class AppModule {}
