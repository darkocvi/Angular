import { Injectable } from '@angular/core';
import { DealerManagementService, DealerProfileModel, NotificationTemplateModel } from '@api-client/public_api';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  DealerActionTypes,
  DealerProfileLoadedAction,
  DealerProfileUpdatedAction,
  LoadDealerProfileAction,
  LoadingDealerProfileFailedAction,
  LoadingNotificationTemplatesFailedAction,
  LoadNotificationTemplatesAction,
  NotificationTemplatesLoadedAction,
  NotificationTemplateUpdatedAction,
  UpdateDealerProfileAction,
  UpdateNotificationTemplateAction,
  UpdatingDealerProfileFailedAction,
  UpdatingNotificationTemplateFailedAction,
} from '../actions/dealer.actions';

@Injectable()
export class DealerEffects {
  @Effect()
  loadDealerProfile$ = this.actions$.pipe(
    ofType(DealerActionTypes.LoadDealerProfile),
    switchMap((action: LoadDealerProfileAction) => {
      return this.dealerManagementService.getDealerProfile().pipe(
        map((dealerProfile: DealerProfileModel) => {
          return new DealerProfileLoadedAction(dealerProfile);
        }),
        catchError(() => of(new LoadingDealerProfileFailedAction()))
      );
    })
  );

  @Effect()
  updateDealerProfile$ = this.actions$.pipe(
    ofType(DealerActionTypes.UpdateDealerProfile),
    switchMap((action: UpdateDealerProfileAction) => {
      return this.dealerManagementService.updateDealerProfile(action.payload).pipe(
        map((dealerProfile: DealerProfileModel) => {
          return new DealerProfileUpdatedAction(dealerProfile);
        }),
        catchError(() => of(new UpdatingDealerProfileFailedAction()))
      );
    })
  );

  @Effect()
  loadNotificationTemplates$ = this.actions$.pipe(
    ofType(DealerActionTypes.LoadNotificationTemplates),
    switchMap((action: LoadNotificationTemplatesAction) => {
      return this.dealerManagementService.getNotificationTemplates().pipe(
        map((templates: NotificationTemplateModel[]) => {
          return new NotificationTemplatesLoadedAction(templates);
        }),
        catchError(() => of(new LoadingNotificationTemplatesFailedAction()))
      );
    })
  );

  @Effect()
  updateNotificationTemplate$ = this.actions$.pipe(
    ofType(DealerActionTypes.UpdateNotificationTemplate),
    switchMap((action: UpdateNotificationTemplateAction) => {
      return this.dealerManagementService.updateNotificationTemplate(action.payload).pipe(
        map(() => {
          return new NotificationTemplateUpdatedAction(action.payload);
        }),
        catchError(() => of(new UpdatingNotificationTemplateFailedAction()))
      );
    })
  );

  constructor(private actions$: Actions, private dealerManagementService: DealerManagementService) {}
}
