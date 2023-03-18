import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatisticsState } from '../models/statistics.store';

export const getStatisticsState = createFeatureSelector('statistics');

export const getStatisticsBusy = createSelector(getStatisticsState, (state: StatisticsState) => state.isBusy);

export const getStatistics = createSelector(getStatisticsState, (state: StatisticsState) => state.statistics);
