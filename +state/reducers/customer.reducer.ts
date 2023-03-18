import { CustomerActions, CustomerActionTypes } from '../actions/customer.actions';
import { CustomerState, initialState } from '../models/customer.store';
import { CustomerDetailsModel } from '@api-client/public_api';

export function customerReducer(state = initialState, action: CustomerActions): CustomerState {
  switch (action.type) {
    case CustomerActionTypes.LoadCustomer:
      return { ...state, selectedCustomer: null, isBusy: true };

    case CustomerActionTypes.CustomerLoaded: {
      const customer = action.payload;
      return { ...state, selectedCustomer: customer, isBusy: false };
    }

    case CustomerActionTypes.EditCustomer:
    case CustomerActionTypes.RedeemCustomerPoints:
    case CustomerActionTypes.EnterCustomerPurchase:
    case CustomerActionTypes.LoadCustomerPoints:
      return { ...state, isBusy: true };

    case CustomerActionTypes.CustomerEdited: {
      const editedCustomer = action.payload;
      return { ...state, selectedCustomer: { ...state.selectedCustomer, ...editedCustomer } as CustomerDetailsModel, isBusy: false };
    }

    case CustomerActionTypes.CustomerPointsLoaded: {
      const loadedCustomer = action.payload;
      const selectedCustomer = state.selectedCustomer
        ? { ...state.selectedCustomer, points: loadedCustomer.points }
        : { ...loadedCustomer };
      return { ...state, selectedCustomer: selectedCustomer as CustomerDetailsModel, isBusy: false };
    }

    case CustomerActionTypes.LoadingCustomerFailed:
    case CustomerActionTypes.LoadingCustomerPointsFailed:
    case CustomerActionTypes.RedeemingCustomerPointsFailed:
    case CustomerActionTypes.EnteringCustomerPurchaseFailed:
    case CustomerActionTypes.EditingCustomerFailed:
    case CustomerActionTypes.CustomerPointsRedeemed:
    case CustomerActionTypes.CustomerPurchaseEntered:
      return { ...state, isBusy: false };

    default:
      return { ...state };
  }
}
