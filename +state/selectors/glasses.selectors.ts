import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GlassesState } from '../models/glasses.store';

export const getGlassesState = createFeatureSelector('glasses');

export const getGlassesBusy = createSelector(getGlassesState, (state: GlassesState) => state.isBusy);

export const getGlasses = createSelector(getGlassesState, (state: GlassesState) => state.glasses);

export const getGlassesById = createSelector(
  getGlassesState,
  (state: GlassesState, props: { glassesId: number }) => state.glasses.find((g) => g.id === props.glassesId) || null
);
