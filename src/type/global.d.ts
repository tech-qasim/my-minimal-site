declare namespace Additional {
  namespace Github {
    type ContributionDays = {
      contributionCount: number;
      date: string;
    };

    type Week = {
      contributionDays: ContributionDay[];
    };
  }
}
