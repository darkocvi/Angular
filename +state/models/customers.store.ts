import { CustomerModel } from '@api-client/public_api';

export interface CustomersState {
  customers: CustomerModel[];
  isBusy: boolean;
}

export const initialState: CustomersState = {
  customers: null,
  isBusy: false,
};
