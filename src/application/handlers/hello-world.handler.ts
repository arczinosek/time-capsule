import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldHandler {
  handle() {
    return {
      greeting: 'Hello World',
      time: new Date(),
    };
  }
}
