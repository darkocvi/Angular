import { Action } from '@ngrx/store';

export enum AppActionTypes {
  AppLoadStateLocal = '[App] Load state local',
}

export class AppLoadStateLocal implements Action {
  readonly type = AppActionTypes.AppLoadStateLocal;
}

export type AppActions = AppLoadStateLocal;
