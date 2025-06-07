import { formatDate, formatDateTime } from '@/shared/utils';

import { Milestone } from '../../../domain/entities/milestone.entity';

export class MilestoneResponse {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly dateStart: string,
    public readonly dateFinish: string,
    public readonly createdAt: string,
    public readonly updatedAt: string | null
  ) {}

  static createFromEntity(entity: Milestone) {
    const updatedAt = entity.getUpdatedAt();

    return new MilestoneResponse(
      entity.id,
      entity.getTitle(),
      entity.getDescription(),
      formatDate(entity.getDateStart()),
      formatDate(entity.getDateFinish()),
      formatDateTime(entity.getCreatedAt()),
      updatedAt && formatDateTime(updatedAt)
    );
  }
}
