import { Controller, Get } from '@nestjs/common';
import { HelloWorldHandler } from '@/application/handlers/hello-world.handler';
import { formatDateTime } from '../utils';

@Controller()
export class AppController {
  constructor(private readonly helloWorldHandler: HelloWorldHandler) {}

  @Get()
  getHello(): string {
    const { greeting, time } = this.helloWorldHandler.handle();

    return `${greeting} @ ${formatDateTime(time)}`;
  }
}
