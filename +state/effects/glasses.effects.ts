import { Injectable } from '@angular/core';
import { DealerManagementService, GlassModel } from '@api-client/public_api';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  AddCustomerGlassesAction,
  AddingCustomerGlassesFailedAction,
  CustomerGlassesAddedAction,
  CustomerGlassesEditedAction,
  CustomerGlassesListLoadedAction,
  CustomerGlassesRemovedAction,
  EditCustomerGlassesAction,
  EditingCustomerGlassesFailedAction,
  GlassesActionTypes,
  LoadCustomerGlassesListAction,
  LoadingCustomerGlassesListFailedAction,
  RemoveCustomerGlassesAction,
  RemovingCustomerGlassesFailedAction,
} from '../actions/glasses.actions';

@Injectable()
export class GlassesEffects {
  @Effect()
  loadCustomerGlasses$ = this.actions$.pipe(
    ofType(GlassesActionTypes.LoadCustomerGlassesList),
    switchMap((action: LoadCustomerGlassesListAction) => {
      return this.dealerManagementService.getCustomerGlasses(action.payload).pipe(
        map((glasses: GlassModel[]) => {
          return new CustomerGlassesListLoadedAction(glasses);
        }),
        catchError(() => of(new LoadingCustomerGlassesListFailedAction()))
      );
    })
  );

  @Effect()
  addCustomerGlasses$ = this.actions$.pipe(
    ofType(GlassesActionTypes.AddCustomerGlasses),
    switchMap((action: AddCustomerGlassesAction) => {
      return this.dealerManagementService.createGlass(action.payload.model).pipe(
        map((glasses: GlassModel) => {
          return new CustomerGlassesAddedAction(glasses);
        }),
        catchError(() => of(new AddingCustomerGlassesFailedAction()))
      );
    })
  );

  @Effect()
  editCustomerGlasses$ = this.actions$.pipe(
    ofType(GlassesActionTypes.EditCustomerGlasses),
    switchMap((action: EditCustomerGlassesAction) => {
      return this.dealerManagementService.updateGlass(action.payload).pipe(
        map((glasses: GlassModel) => {
          return new CustomerGlassesEditedAction(glasses);
        }),
        catchError(() => of(new EditingCustomerGlassesFailedAction()))
      );
    })
  );

  @Effect()
  removeCustomerGlasses$ = this.actions$.pipe(
    ofType(GlassesActionTypes.RemoveCustomerGlasses),
    switchMap((action: RemoveCustomerGlassesAction) => {
      return this.dealerManagementService.deleteGlass(action.payload).pipe(
        map(() => {
          return new CustomerGlassesRemovedAction(action.payload);
        }),
        catchError(() => of(new RemovingCustomerGlassesFailedAction()))
      );
    })
  );

  constructor(private actions$: Actions, private dealerManagementService: DealerManagementService) {}
}
