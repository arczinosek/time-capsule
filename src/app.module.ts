import { Module } from '@nestjs/common';
import { AppController } from './presentation/http/app.controller';
import { HelloWorldHandler } from './application/handler/hello-world.handler';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [HelloWorldHandler],
})
export class AppModule {}
