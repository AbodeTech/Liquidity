export interface DashboardOverviewResponse {
  overview: {
    total: number;
    draft: number;
    submitted: number;
    underReview: number;
    approved: number;
    rejected: number;
  };
  trends: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
}

export interface StatusBreakdownItem {
  status: string;
  count: number;
  percentage: number;
}

export interface DashboardStatusStatisticsResponse {
  total: number;
  breakdown: StatusBreakdownItem[];
}

export interface ApplicationTypeBreakdownItem {
  type: string;
  count: number;
  percentage: number;
}

export interface DashboardApplicationStatisticsResponse {
  total: number;
  breakdown: ApplicationTypeBreakdownItem[];
}
