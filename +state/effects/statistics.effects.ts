import { Injectable } from '@angular/core';
import { DealerManagementService, NotificationStatistic } from '@api-client/public_api';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LoadingNotificationStatisticsFailedAction,
  LoadNotificationStatisticsAction,
  NotificationStatisticsLoadedAction,
  StatisticsActionTypes,
} from '../actions/statistics.actions';

@Injectable()
export class StatisticsEffects {
  @Effect()
  loadNotificationStatistics$ = this.actions$.pipe(
    ofType(StatisticsActionTypes.LoadNotificationStatistics),
    switchMap((action: LoadNotificationStatisticsAction) => {
      return this.dealerManagementService.getNotificationStatistic().pipe(
        map((statistics: NotificationStatistic[]) => {
          return new NotificationStatisticsLoadedAction(statistics);
        }),
        catchError(() => of(new LoadingNotificationStatisticsFailedAction()))
      );
    })
  );

  constructor(private actions$: Actions, private dealerManagementService: DealerManagementService) {}
}
