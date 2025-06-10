import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';

import { FindMilestonesRequest } from './find-milestones.request';

describe('FindMilestonesRequest', () => {
  describe('transform', () => {
    let pipe: ValidationPipe;

    const transform = (input: object): Promise<FindMilestonesRequest> =>
      pipe.transform(input, { type: 'param', metatype: FindMilestonesRequest });

    beforeEach(() => {
      pipe = new ValidationPipe({
        transform: true,
        whitelist: true,
      });
    });

    it.each([
      {
        input: {},
        expectedRequest: new FindMilestonesRequest(1, 10),
      },
      {
        input: { page: '2', limit: '1' },
        expectedRequest: new FindMilestonesRequest(2, 1),
      },
    ])(
      'should return FindMilestonesRequest when validation pass',
      async ({ input, expectedRequest }) => {
        const result = await transform(input);

        expect(result).toStrictEqual(expectedRequest);
      }
    );

    it('should throw BadRequestException when validation fails', async () => {
      const input = {
        page: 'string',
        limit: 'string',
      };

      await expect(transform(input)).rejects.toThrow(BadRequestException);
    });
  });

  describe('validation', () => {
    it('should pass validation for mininmum values', async () => {
      const request = new FindMilestonesRequest(1, 1);

      const result = await validate(request);

      expect(result).toHaveLength(0);
    });

    it('should pass validation for maximum values', async () => {
      const request = new FindMilestonesRequest(Number.MAX_SAFE_INTEGER, 25);

      const result = await validate(request);

      expect(result).toHaveLength(0);
    });

    it.each([
      {
        request: new FindMilestonesRequest('string' as unknown as number, 1),
        expectedConstraints: {
          isInt: 'page must be an integer number',
          isPositive: 'page must be a positive number',
        },
      },
      {
        request: new FindMilestonesRequest(3.14, 1),
        expectedConstraints: {
          isInt: 'page must be an integer number',
        },
      },
      {
        request: new FindMilestonesRequest(0, 1),
        expectedConstraints: {
          isPositive: 'page must be a positive number',
        },
      },
      {
        request: new FindMilestonesRequest(1, 'string' as unknown as number),
        expectedConstraints: {
          isInt: 'limit must be an integer number',
          isPositive: 'limit must be a positive number',
          max: 'limit must not be greater than 25',
        },
      },
      {
        request: new FindMilestonesRequest(1, 3.14),
        expectedConstraints: {
          isInt: 'limit must be an integer number',
        },
      },
      {
        request: new FindMilestonesRequest(1, 0),
        expectedConstraints: {
          isPositive: 'limit must be a positive number',
        },
      },
      {
        request: new FindMilestonesRequest(1, 26),
        expectedConstraints: {
          max: 'limit must not be greater than 25',
        },
      },
    ])(
      'should not pass validation (case #$#)',
      async ({ request, expectedConstraints }) => {
        const result = await validate(request);

        expect(result).toHaveLength(1);
        expect(result[0].constraints).toStrictEqual(expectedConstraints);
      }
    );
  });
});
