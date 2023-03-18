import { Action } from '@ngrx/store';
import { GlassModel, GlassCreateModel } from '@api-client/public_api';

export enum GlassesActionTypes {
  LoadCustomerGlassesList = '[Opticon] Load Customer Glasses List',
  CustomerGlassesListLoaded = '[Opticon] Customer Glasses List Loaded',
  LoadingCustomerGlassesListFailed = '[Opticon] Loading Customer Glasses List Failed',
  AddCustomerGlasses = '[Opticon] Add Customer Glasses',
  CustomerGlassesAdded = '[Opticon] Customer Glasses Added',
  AddingCustomerGlassesFailed = '[Opticon] Adding Customer Glasses Failed',
  EditCustomerGlasses = '[Opticon] Edit Customer Glasses',
  CustomerGlassesEdited = '[Opticon] Customer Glasses Edited',
  EditingCustomerGlassesFailed = '[Opticon] Editing Customer Glasses Failed',
  RemoveCustomerGlasses = '[Opticon] Remove Customer Glasses',
  CustomerGlassesRemoved = '[Opticon] Customer Glasses Removed',
  RemovingCustomerGlassesFailed = '[Opticon] Removing Customer Glasses Failed',
}

export class LoadCustomerGlassesListAction implements Action {
  readonly type = GlassesActionTypes.LoadCustomerGlassesList;
  constructor(public payload: number) {}
}

export class CustomerGlassesListLoadedAction implements Action {
  readonly type = GlassesActionTypes.CustomerGlassesListLoaded;
  constructor(public payload: GlassModel[]) {}
}

export class LoadingCustomerGlassesListFailedAction implements Action {
  readonly type = GlassesActionTypes.LoadingCustomerGlassesListFailed;
}

export class AddCustomerGlassesAction implements Action {
  readonly type = GlassesActionTypes.AddCustomerGlasses;
  constructor(public payload: { model: GlassCreateModel }) {}
}

export class CustomerGlassesAddedAction implements Action {
  readonly type = GlassesActionTypes.CustomerGlassesAdded;
  constructor(public payload: GlassModel) {}
}

export class AddingCustomerGlassesFailedAction implements Action {
  readonly type = GlassesActionTypes.AddingCustomerGlassesFailed;
}

export class EditCustomerGlassesAction implements Action {
  readonly type = GlassesActionTypes.EditCustomerGlasses;
  constructor(public payload: GlassModel) {}
}

export class CustomerGlassesEditedAction implements Action {
  readonly type = GlassesActionTypes.CustomerGlassesEdited;
  constructor(public payload: GlassModel) {}
}

export class EditingCustomerGlassesFailedAction implements Action {
  readonly type = GlassesActionTypes.EditingCustomerGlassesFailed;
}

export class RemoveCustomerGlassesAction implements Action {
  readonly type = GlassesActionTypes.RemoveCustomerGlasses;
  constructor(public payload: number) {}
}

export class CustomerGlassesRemovedAction implements Action {
  readonly type = GlassesActionTypes.CustomerGlassesRemoved;
  constructor(public payload: number) {}
}

export class RemovingCustomerGlassesFailedAction implements Action {
  readonly type = GlassesActionTypes.RemovingCustomerGlassesFailed;
}

export type GlassesActions =
  | LoadCustomerGlassesListAction
  | CustomerGlassesListLoadedAction
  | LoadingCustomerGlassesListFailedAction
  | AddCustomerGlassesAction
  | CustomerGlassesAddedAction
  | AddingCustomerGlassesFailedAction
  | EditCustomerGlassesAction
  | CustomerGlassesEditedAction
  | EditingCustomerGlassesFailedAction
  | RemoveCustomerGlassesAction
  | CustomerGlassesRemovedAction
  | RemovingCustomerGlassesFailedAction;
