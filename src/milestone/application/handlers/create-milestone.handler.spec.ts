import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';

import { Milestone } from '../../domain/entities/milestone.entity';
import { MilestoneRepository } from '../../infrastructure/repositories/milestone.repository';
import { CreateMilestoneCommand } from '../commands';
import { CreateMilestoneHandler } from './create-milestone.handler';

describe('CreateMilestoneHandler', () => {
  describe('handle', () => {
    it('should return repository save result', async () => {
      const repositoryMock = createMock<MilestoneRepository>();
      const loggerMock = createMock<Logger>();
      const handler = new CreateMilestoneHandler(repositoryMock, loggerMock);
      const command = new CreateMilestoneCommand(
        'title',
        'description',
        new Date('2025-05-29'),
        new Date('2025-05-30')
      );

      const expectedEntity = Milestone.create(
        command.title,
        command.description,
        command.dateStart,
        command.dateFinish
      );

      const saveSpy = jest
        .spyOn(repositoryMock, 'save')
        .mockImplementationOnce((entity: Milestone) => Promise.resolve(entity));

      const result = await handler.handle(command);

      expect(result).toStrictEqual(expectedEntity);
      expect(saveSpy).toHaveBeenCalledWith(expectedEntity);
    });
  });
});
