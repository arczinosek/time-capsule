export class FindMilestonesQuery {
  public static readonly MAX_LIMIT = 25;

  public readonly limit: number;
  public readonly page: number;

  constructor(page: number, limit: number) {
    if (limit < 1) {
      throw new Error(`Parameter 'limit' is not positive`);
    }

    if (limit > FindMilestonesQuery.MAX_LIMIT) {
      throw new Error(
        `Parameter 'limit' is greater than '${FindMilestonesQuery.MAX_LIMIT}'`
      );
    }

    if (page < 1) {
      throw new Error(`Parameter 'page' is not positive`);
    }

    this.limit = limit;
    this.page = page;
  }
}
