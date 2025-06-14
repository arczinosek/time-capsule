import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { InvalidPeriodError } from '../errors';

@Entity({ name: 'milestones' })
export class Milestone {
  private static readonly TITLE_MAX_LEN = 127;

  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly id: number;

  @Column({ length: Milestone.TITLE_MAX_LEN })
  private title: string;

  @Column({ type: 'text' })
  private description: string;

  @Column({ type: 'date' })
  private dateStart: Date;

  @Column({ type: 'date' })
  private dateFinish: Date;

  @CreateDateColumn()
  private readonly createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  private updatedAt: Date | null = null;

  private constructor() {}

  static create(
    title: string,
    description: string,
    dateStart: Date,
    dateFinish: Date
  ): Milestone {
    const milestone = new Milestone();

    milestone.updateTitle(title);
    milestone.updateDescription(description);
    milestone.updatePeriod(dateStart, dateFinish);

    return milestone;
  }

  updateTitle(title: string) {
    if (!title.length) {
      throw new Error(`title can not be empty`);
    }

    if (title.length > Milestone.TITLE_MAX_LEN) {
      throw new Error(
        `title is longer than allowed '${Milestone.TITLE_MAX_LEN}'`
      );
    }

    this.title = title;

    return this;
  }

  getTitle(): string {
    return this.title;
  }

  updateDescription(description: string) {
    this.description = description;

    return this;
  }

  getDescription(): string {
    return this.description;
  }

  updatePeriod(dateStart: Date, dateFinish: Date) {
    if (dateStart > dateFinish) {
      throw new InvalidPeriodError();
    }

    this.dateStart = new Date(dateStart);
    this.dateFinish = new Date(dateFinish);

    return this;
  }

  getDateStart(): Date {
    return new Date(this.dateStart);
  }

  getDateFinish(): Date {
    return new Date(this.dateFinish);
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date | null {
    if (this.updatedAt) {
      return new Date(this.updatedAt);
    }

    return null;
  }
}
