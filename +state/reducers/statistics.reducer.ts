import { initialState, StatisticsState } from '../models/statistics.store';
import { StatisticsActions, StatisticsActionTypes } from '../actions/statistics.actions';

export function statisticsReducer(state = initialState, action: StatisticsActions): StatisticsState {
  switch (action.type) {
    case StatisticsActionTypes.LoadNotificationStatistics:
      return { ...state, statistics: null, isBusy: true };

    case StatisticsActionTypes.NotificationStatisticsLoaded: {
      const statistics = action.payload;
      return { ...state, statistics: statistics, isBusy: false };
    }

    case StatisticsActionTypes.LoadingNotificationStatisticsFailed:
      return { ...state, isBusy: false };

    default:
      return { ...state };
  }
}
