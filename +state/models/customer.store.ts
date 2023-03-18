import { CustomerDetailsModel } from '@api-client/public_api';

export interface CustomerState {
  selectedCustomer: CustomerDetailsModel;
  isBusy: boolean;
}

export const initialState: CustomerState = {
  selectedCustomer: null,
  isBusy: false,
};
