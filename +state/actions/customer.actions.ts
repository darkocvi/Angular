import { Action } from '@ngrx/store';
import {
  CustomerModel,
  CustomerCreateModel,
  CustomerDetailsModel,
  CustomerPurchaseModel,
  CustomerRedeemPointsModel,
  SwaggerException,
} from '@api-client/public_api';

export enum CustomerActionTypes {
  LoadCustomer = '[Opticon] Load Customer',
  CustomerLoaded = '[Opticon] Customer Loaded',
  LoadingCustomerFailed = '[Opticon] Loading Customer Failed',
  AddNewCustomer = '[Opticon] Add New Customer',
  NewCustomerAdded = '[Opticon] New Customer Added',
  AddingNewCustomerFailed = '[Opticon] Adding New Customer Failed',
  EditCustomer = '[Opticon] Edit Customer',
  CustomerEdited = '[Opticon] Customer Edited',
  EditingCustomerFailed = '[Opticon] Editing Customer Failed',
  LoadCustomerPoints = '[Opticon] Load Customer Points',
  CustomerPointsLoaded = '[Opticon] Customer Points Loaded',
  LoadingCustomerPointsFailed = '[Opticon] Loading Customer Points Failed',
  EnterCustomerPurchase = '[Opticon] Enter Customer Purchase',
  CustomerPurchaseEntered = '[Opticon] Customer Purchase Entered',
  EnteringCustomerPurchaseFailed = '[Opticon] Entering Customer Purchase Failed',
  RedeemCustomerPoints = '[Opticon] Redeem Customer Points',
  CustomerPointsRedeemed = '[Opticon] Customer Points Redeemed',
  RedeemingCustomerPointsFailed = '[Opticon] Redeeming Customer Points Failed',
}

export class LoadCustomerAction implements Action {
  readonly type = CustomerActionTypes.LoadCustomer;
  constructor(public payload: number) {}
}

export class CustomerLoadedAction implements Action {
  readonly type = CustomerActionTypes.CustomerLoaded;
  constructor(public payload: CustomerDetailsModel) {}
}

export class LoadingCustomerFailedAction implements Action {
  readonly type = CustomerActionTypes.LoadingCustomerFailed;
  constructor(public payload: SwaggerException) {}
}

export class AddNewCustomerAction implements Action {
  readonly type = CustomerActionTypes.AddNewCustomer;
  constructor(public payload: CustomerCreateModel) {}
}

export class NewCustomerAddedAction implements Action {
  readonly type = CustomerActionTypes.NewCustomerAdded;
  constructor(public payload: CustomerModel) {}
}

export class AddingNewCustomerFailedAction implements Action {
  readonly type = CustomerActionTypes.AddingNewCustomerFailed;
}

export class EditCustomerAction implements Action {
  readonly type = CustomerActionTypes.EditCustomer;
  constructor(public payload: CustomerModel) {}
}

export class CustomerEditedAction implements Action {
  readonly type = CustomerActionTypes.CustomerEdited;
  constructor(public payload: CustomerModel) {}
}

export class EditingCustomerFailedAction implements Action {
  readonly type = CustomerActionTypes.EditingCustomerFailed;
}

export class LoadCustomerPointsAction implements Action {
  readonly type = CustomerActionTypes.LoadCustomerPoints;
  constructor(public payload: number) {}
}

export class CustomerPointsLoadedAction implements Action {
  readonly type = CustomerActionTypes.CustomerPointsLoaded;
  constructor(public payload: CustomerDetailsModel) {}
}

export class LoadingCustomerPointsFailedAction implements Action {
  readonly type = CustomerActionTypes.LoadingCustomerPointsFailed;
}

export class EnterCustomerPurchaseAction implements Action {
  readonly type = CustomerActionTypes.EnterCustomerPurchase;
  constructor(public payload: CustomerPurchaseModel) {}
}

export class CustomerPurchaseEnteredAction implements Action {
  readonly type = CustomerActionTypes.CustomerPurchaseEntered;
}

export class EnteringCustomerPurchaseFailedAction implements Action {
  readonly type = CustomerActionTypes.EnteringCustomerPurchaseFailed;
}

export class RedeemCustomerPointsAction implements Action {
  readonly type = CustomerActionTypes.RedeemCustomerPoints;
  constructor(public payload: CustomerRedeemPointsModel) {}
}

export class CustomerPointsRedeemedAction implements Action {
  readonly type = CustomerActionTypes.CustomerPointsRedeemed;
}

export class RedeemingCustomerPointsFailedAction implements Action {
  readonly type = CustomerActionTypes.RedeemingCustomerPointsFailed;
}

export type CustomerActions =
  | LoadCustomerAction
  | CustomerLoadedAction
  | LoadingCustomerFailedAction
  | AddNewCustomerAction
  | NewCustomerAddedAction
  | AddingNewCustomerFailedAction
  | EditCustomerAction
  | CustomerEditedAction
  | EditingCustomerFailedAction
  | LoadCustomerPointsAction
  | CustomerPointsLoadedAction
  | LoadingCustomerPointsFailedAction
  | EnterCustomerPurchaseAction
  | CustomerPurchaseEnteredAction
  | EnteringCustomerPurchaseFailedAction
  | RedeemCustomerPointsAction
  | CustomerPointsRedeemedAction
  | RedeemingCustomerPointsFailedAction;
