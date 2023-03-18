import { Injectable } from '@angular/core';
import { CustomerDetailsModel, CustomerModel, DealerManagementService } from '@api-client/public_api';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  AddingNewCustomerFailedAction,
  AddNewCustomerAction,
  CustomerActionTypes,
  CustomerEditedAction,
  CustomerLoadedAction,
  CustomerPointsLoadedAction,
  CustomerPointsRedeemedAction,
  CustomerPurchaseEnteredAction,
  EditCustomerAction,
  EditingCustomerFailedAction,
  EnterCustomerPurchaseAction,
  EnteringCustomerPurchaseFailedAction,
  LoadCustomerAction,
  LoadCustomerPointsAction,
  LoadingCustomerFailedAction,
  LoadingCustomerPointsFailedAction,
  NewCustomerAddedAction,
  RedeemCustomerPointsAction,
  RedeemingCustomerPointsFailedAction,
} from '../actions/customer.actions';

@Injectable()
export class CustomerEffects {
  @Effect()
  loadCustomer$ = this.actions$.pipe(
    ofType(CustomerActionTypes.LoadCustomer),
    switchMap((action: LoadCustomerAction) => {
      return this.dealerManagementService.getCustomerDetails(action.payload).pipe(
        map((customer: CustomerDetailsModel) => {
          return new CustomerLoadedAction(customer);
        }),
        catchError((error) => of(new LoadingCustomerFailedAction(error)))
      );
    })
  );

  @Effect()
  loadCustomerPoints$ = this.actions$.pipe(
    ofType(CustomerActionTypes.LoadCustomerPoints),
    switchMap((action: LoadCustomerPointsAction) => {
      return this.dealerManagementService.getCustomerDetails(action.payload).pipe(
        map((customer: CustomerDetailsModel) => {
          return new CustomerPointsLoadedAction(customer);
        }),
        catchError(() => of(new LoadingCustomerPointsFailedAction()))
      );
    })
  );

  @Effect()
  addNewCustomer$ = this.actions$.pipe(
    ofType(CustomerActionTypes.AddNewCustomer),
    switchMap((action: AddNewCustomerAction) => {
      return this.dealerManagementService.createCustomer(action.payload).pipe(
        map((customer: CustomerModel) => {
          return new NewCustomerAddedAction(customer);
        }),
        catchError(() => of(new AddingNewCustomerFailedAction()))
      );
    })
  );

  @Effect()
  editCustomer$ = this.actions$.pipe(
    ofType(CustomerActionTypes.EditCustomer),
    switchMap((action: EditCustomerAction) => {
      return this.dealerManagementService.updateCustomer(action.payload).pipe(
        map((customer: CustomerModel) => {
          return new CustomerEditedAction(customer);
        }),
        catchError(() => of(new EditingCustomerFailedAction()))
      );
    })
  );

  @Effect()
  addCustomerPurchase$ = this.actions$.pipe(
    ofType(CustomerActionTypes.EnterCustomerPurchase),
    switchMap((action: EnterCustomerPurchaseAction) => {
      return this.dealerManagementService.addPurchase(action.payload).pipe(
        map(() => {
          return new CustomerPurchaseEnteredAction();
        }),
        catchError(() => of(new EnteringCustomerPurchaseFailedAction()))
      );
    })
  );

  @Effect()
  redeemCustomerPoints$ = this.actions$.pipe(
    ofType(CustomerActionTypes.RedeemCustomerPoints),
    switchMap((action: RedeemCustomerPointsAction) => {
      return this.dealerManagementService.redeemPoints(action.payload).pipe(
        map(() => {
          return new CustomerPointsRedeemedAction();
        }),
        catchError(() => of(new RedeemingCustomerPointsFailedAction()))
      );
    })
  );

  constructor(private actions$: Actions, private dealerManagementService: DealerManagementService) {}
}
