import { Action } from '@ngrx/store';
import { NotificationStatistic } from '@api-client/public_api';

export enum StatisticsActionTypes {
  LoadNotificationStatistics = '[Opticon] Load Notification Statistics',
  NotificationStatisticsLoaded = '[Opticon] Notification Statistics Loaded',
  LoadingNotificationStatisticsFailed = '[Opticon] Loading Notification Statistics Failed',
}

export class LoadNotificationStatisticsAction implements Action {
  readonly type = StatisticsActionTypes.LoadNotificationStatistics;
  constructor() {}
}

export class NotificationStatisticsLoadedAction implements Action {
  readonly type = StatisticsActionTypes.NotificationStatisticsLoaded;
  constructor(public payload: NotificationStatistic[]) {}
}

export class LoadingNotificationStatisticsFailedAction implements Action {
  readonly type = StatisticsActionTypes.LoadingNotificationStatisticsFailed;
}

export type StatisticsActions =
  | LoadNotificationStatisticsAction
  | NotificationStatisticsLoadedAction
  | LoadingNotificationStatisticsFailedAction;
