import { Module } from '@nestjs/common';

import { HelloWorldHandler } from './application/handlers/hello-world.handler';
import { HelloController } from './presentation/http/hello.controller';

@Module({
  controllers: [HelloController],
  providers: [HelloWorldHandler],
})
export class HelloModule {}
