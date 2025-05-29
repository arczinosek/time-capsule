export class FindMilestonesQuery {
  public static readonly LIMIT_DEFAULT = 10;
  public static readonly LIMIT_MAX = 25;

  public readonly limit: number;
  public readonly page: number;

  constructor(page = 1, limit = FindMilestonesQuery.LIMIT_DEFAULT) {
    if (limit < 1) {
      throw new Error(`Parameter 'limit' is not positive`);
    }

    if (limit > FindMilestonesQuery.LIMIT_MAX) {
      throw new Error(
        `Parameter 'limit' is greater than allowed '${FindMilestonesQuery.LIMIT_MAX}'`
      );
    }

    if (page < 1) {
      throw new Error(`Parameter 'page' is not positive`);
    }

    this.limit = limit;
    this.page = page;
  }
}
