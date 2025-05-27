import { AppController } from './app.controller';
import { HelloWorldHandler } from '../../application/handlers/hello-world.handler';

describe('AppController', () => {
  const CURRENT_TIME = '2025-05-16T21:05:54';

  let appController: AppController;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(CURRENT_TIME));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    const handler: HelloWorldHandler = {
      handle: () => ({
        greeting: 'Hello, world!',
        time: new Date('2025-05-09T09:01:06'),
      }),
    };

    appController = new AppController(handler);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(
        `Hello, world! @ 09.05.2025, 09:01:06`
      );
    });
  });
});
