import { Controller, Get } from '@nestjs/common';
import { HelloWorldHandler } from '../../application/handler/hello-world.handler';
import { formatDateTime } from '../utils/date.util';

@Controller()
export class AppController {
  constructor(private readonly helloWorldHandler: HelloWorldHandler) {}

  @Get()
  getHello(): string {
    const { greeting, time } = this.helloWorldHandler.handle();

    return `${greeting} @ ${formatDateTime(time)}`;
  }
}
