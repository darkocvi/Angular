import { Injectable } from '@angular/core';
import { CustomerModel, DealerManagementService } from '@api-client/public_api';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  CustomersActionTypes,
  CustomersNotifiedAction,
  ListItemRemovedAction,
  ListItemRemovingFailedAction,
  ListLoadedAction,
  ListLoadingFailedAction,
  NotificationCustomersFailedAction,
  NotifyCustomersAction,
  RemoveListItemAction,
} from '../actions/customers.actions';

@Injectable()
export class CustomersEffects {
  @Effect()
  loadCustomers$ = this.actions$.pipe(
    ofType(CustomersActionTypes.LoadList),
    switchMap(() => {
      return this.dealerManagementService.loadCustomers().pipe(
        map((customers: CustomerModel[]) => {
          return new ListLoadedAction(customers);
        }),
        catchError(() => of(new ListLoadingFailedAction()))
      );
    })
  );

  @Effect()
  removeCustomer$ = this.actions$.pipe(
    ofType(CustomersActionTypes.RemoveListItem),
    switchMap((action: RemoveListItemAction) => {
      return this.dealerManagementService.deleteCustomer(action.payload).pipe(
        map(() => {
          return new ListItemRemovedAction(action.payload);
        }),
        catchError(() => of(new ListItemRemovingFailedAction()))
      );
    })
  );

  @Effect()
  notifyCustomers$ = this.actions$.pipe(
    ofType(CustomersActionTypes.NotifyCustomers),
    switchMap((action: NotifyCustomersAction) => {
      return this.dealerManagementService.notifyCustomers(action.payload).pipe(
        map(() => {
          return new CustomersNotifiedAction(action.payload);
        }),
        catchError(() => of(new NotificationCustomersFailedAction()))
      );
    })
  );

  constructor(private actions$: Actions, private dealerManagementService: DealerManagementService) {}
}
