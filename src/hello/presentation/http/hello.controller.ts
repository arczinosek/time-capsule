import { Controller, Get } from '@nestjs/common';

import { formatDateTime } from '@/shared/utils';

import { HelloWorldHandler } from '../../application/handlers/hello-world.handler';

@Controller()
export class HelloController {
  constructor(private readonly helloWorldHandler: HelloWorldHandler) {}

  @Get()
  getHello(): string {
    const { greeting, time } = this.helloWorldHandler.handle();

    return `${greeting} @ ${formatDateTime(time)}`;
  }
}
