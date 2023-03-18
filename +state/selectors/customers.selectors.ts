import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CustomersState } from '../models/customers.store';

export const getCustomersState = createFeatureSelector('customers');

export const getCustomersBusy = createSelector(getCustomersState, (state: CustomersState) => state.isBusy);

export const getCustomers = createSelector(getCustomersState, (state: CustomersState) => state.customers);
