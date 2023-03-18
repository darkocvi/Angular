import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CustomerState } from '../models/customer.store';

export const getCustomerState = createFeatureSelector('selectedCustomer');

export const getSelectedCustomerBusy = createSelector(getCustomerState, (state: CustomerState) => state.isBusy);

export const getSelectedCustomer = createSelector(getCustomerState, (state: CustomerState) => state.selectedCustomer);
