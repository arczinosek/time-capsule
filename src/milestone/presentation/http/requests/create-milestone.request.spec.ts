import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';

import { CreateMilestoneRequest } from './create-milestone.request';

describe('CreateMilestoneRequest', () => {
  describe('transform', () => {
    let validationPipe: ValidationPipe;

    const transform = (input: object) =>
      validationPipe.transform(input, {
        type: 'param',
        metatype: CreateMilestoneRequest,
      });

    beforeEach(() => {
      validationPipe = new ValidationPipe({
        whitelist: true,
        transform: true,
      });
    });

    it('should return CreateMilestoneRequest object when validation pass', async () => {
      const input = {
        title: 'valid title',
        description: 'valid description',
        dateStart: '2025-06-08',
        dateFinish: '2025-06-09',
      };
      const expectedRequest = new CreateMilestoneRequest(
        input.title,
        input.description,
        input.dateStart,
        input.dateFinish
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const request = await transform(input);

      expect(request).toStrictEqual(expectedRequest);
    });

    it('should throw BadRequestException when validation fails', async () => {
      const input = {};

      await expect(transform(input)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validation', () => {
    const createRequest = (
      options: Partial<CreateMilestoneRequest>
    ): CreateMilestoneRequest =>
      new CreateMilestoneRequest(
        options.title ?? 'valid title',
        options.description ?? 'valid description',
        options.dateStart ?? '2025-06-08',
        options.dateFinish ?? '2025-06-09'
      );

    it.each([
      {
        request: createRequest({ title: Math.random() as unknown as string }),
        expectedConstraints: {
          isString: 'title must be a string',
          maxLength: 'title must be shorter than or equal to 127 characters',
          minLength: 'title must be longer than or equal to 3 characters',
        },
      },
      {
        request: createRequest({ title: 'xx' }),
        expectedConstraints: {
          minLength: 'title must be longer than or equal to 3 characters',
        },
      },
      {
        request: createRequest({ title: 'x'.repeat(128) }),
        expectedConstraints: {
          maxLength: 'title must be shorter than or equal to 127 characters',
        },
      },
      {
        request: createRequest({
          description: Math.random() as unknown as string,
        }),
        expectedConstraints: {
          isString: 'description must be a string',
        },
      },
      {
        request: createRequest({ dateStart: 'not a date string' }),
        expectedConstraints: {
          isDateString: 'dateStart must be a valid date string',
          matches: 'dateStart must be a valid date string',
        },
      },
      {
        request: createRequest({ dateStart: '2025-06-08T16:40:00' }),
        expectedConstraints: {
          matches: 'dateStart must be a valid date string',
        },
      },
      {
        request: createRequest({ dateFinish: 'not a date string' }),
        expectedConstraints: {
          isDateString: 'dateFinish must be a valid date string',
          matches: 'dateFinish must be a valid date string',
        },
      },
      {
        request: createRequest({ dateFinish: '2025-06-09T17:00:00' }),
        expectedConstraints: {
          matches: 'dateFinish must be a valid date string',
        },
      },
    ])(
      'should not pass validation (case: #$#)',
      async ({ request, expectedConstraints }) => {
        const result = await validate(request);

        expect(result).toHaveLength(1);
        expect(result[0].constraints).toStrictEqual(expectedConstraints);
      }
    );
  });
});
