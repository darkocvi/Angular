import { NotificationStatistic } from '@api-client/public_api';

export interface StatisticsState {
  statistics: NotificationStatistic[];
  isBusy: boolean;
}

export const initialState: StatisticsState = {
  statistics: null,
  isBusy: false,
};
