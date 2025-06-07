export class CreateMilestoneCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly dateStart: Date,
    public readonly dateFinish: Date
  ) {}
}
