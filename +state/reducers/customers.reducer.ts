import { CustomersActions, CustomersActionTypes } from '../actions/customers.actions';
import { CustomersState, initialState } from '../models/customers.store';
import { CustomerActions, CustomerActionTypes } from '../actions/customer.actions';

export function customersReducer(state = initialState, action: CustomersActions | CustomerActions): CustomersState {
  switch (action.type) {
    case CustomersActionTypes.LoadList:
      return { ...state, isBusy: true };

    case CustomersActionTypes.ListLoaded: {
      const customers = action.payload;
      return { ...state, customers: customers, isBusy: false };
    }

    case CustomersActionTypes.RemoveListItem:
    case CustomersActionTypes.NotifyCustomers:
      return { ...state, isBusy: true };

    case CustomersActionTypes.ListItemRemoved: {
      const customerId = action.payload;
      const customers = [...state.customers];
      const idx = customers.findIndex((c) => c.id === customerId);
      if (idx > -1) {
        customers.splice(idx, 1);
      }
      return { ...state, customers: customers, isBusy: false };
    }

    case CustomerActionTypes.AddNewCustomer:
      return { ...state, isBusy: true };

    case CustomerActionTypes.NewCustomerAdded: {
      const customer = action.payload;
      const customers = [...state.customers];
      const idx = customers.findIndex((c) => c.id === customer.id);
      if (idx === -1) {
        customers.push(customer);
      }
      return { ...state, customers: customers, isBusy: false };
    }

    case CustomerActionTypes.AddingNewCustomerFailed:
    case CustomersActionTypes.ListItemRemovingFailed:
    case CustomersActionTypes.ListLoadingFailed:
    case CustomersActionTypes.NotificationCustomersFailed:
    case CustomersActionTypes.CustomersNotified:
      return { ...state, isBusy: false };

    default:
      return { ...state };
  }
}
