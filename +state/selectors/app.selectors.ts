import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/app.store';

export const getAppState = createFeatureSelector('app');

export const getAppStateData = createSelector(getAppState, (state: AppState) => state);
