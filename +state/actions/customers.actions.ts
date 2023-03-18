import { Action } from '@ngrx/store';
import { CreateNotificationEventModel, CustomerModel } from '@api-client/public_api';

export enum CustomersActionTypes {
  LoadList = '[Opticon] Load Customers List',
  ListLoaded = '[Opticon] Customers List Loaded',
  ListLoadingFailed = '[Opticon] Customers List Loading Failed',
  RemoveListItem = '[Opticon] Remove Customer from List',
  ListItemRemoved = '[Opticon] Customer Removed from List',
  ListItemRemovingFailed = '[Opticon] Customers Removing Failed',
  NotifyCustomers = '[Opticon] Notify Customers',
  CustomersNotified = '[Opticon] Customers Notified',
  NotificationCustomersFailed = '[Opticon] Notification Customers Failed',
}

export class LoadListAction implements Action {
  readonly type = CustomersActionTypes.LoadList;
  constructor() {}
}

export class ListLoadedAction implements Action {
  readonly type = CustomersActionTypes.ListLoaded;
  constructor(public payload: CustomerModel[]) {}
}

export class ListLoadingFailedAction implements Action {
  readonly type = CustomersActionTypes.ListLoadingFailed;
}

export class RemoveListItemAction implements Action {
  readonly type = CustomersActionTypes.RemoveListItem;
  constructor(public payload: number) {}
}

export class ListItemRemovedAction implements Action {
  readonly type = CustomersActionTypes.ListItemRemoved;
  constructor(public payload: number) {}
}

export class ListItemRemovingFailedAction implements Action {
  readonly type = CustomersActionTypes.ListItemRemovingFailed;
}

export class NotifyCustomersAction implements Action {
  readonly type = CustomersActionTypes.NotifyCustomers;
  constructor(public payload: CreateNotificationEventModel) {}
}

export class CustomersNotifiedAction implements Action {
  readonly type = CustomersActionTypes.CustomersNotified;
  constructor(public payload: CreateNotificationEventModel) {}
}

export class NotificationCustomersFailedAction implements Action {
  readonly type = CustomersActionTypes.NotificationCustomersFailed;
}

export type CustomersActions =
  | LoadListAction
  | ListLoadedAction
  | ListLoadingFailedAction
  | RemoveListItemAction
  | ListItemRemovedAction
  | ListItemRemovingFailedAction
  | NotifyCustomersAction
  | CustomersNotifiedAction
  | NotificationCustomersFailedAction;
