import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './models/app.store';
import { CustomersState } from './models/customers.store';
import { appReducer } from './reducers/app.reducer';
import { customersReducer } from './reducers/customers.reducer';
import { CustomerState } from './models/customer.store';
import { customerReducer } from './reducers/customer.reducer';
import { glassesReducer } from './reducers/glasses.reducer';
import { GlassesState } from './models/glasses.store';
import { DealerState } from './models/dealer.store';
import { dealerReducer } from './reducers/dealer.reducer';
import { StatisticsState } from './models/statistics.store';
import { statisticsReducer } from './reducers/statistics.reducer';
import { environment } from '../../environments/environment';

export interface RootState {
  app: AppState;
  customers: CustomersState;
  selectedCustomer: CustomerState;
  glasses: GlassesState;
  dealer: DealerState;
  statistics: StatisticsState;
}

export const reducers: ActionReducerMap<RootState> = {
  app: appReducer,
  customers: customersReducer,
  selectedCustomer: customerReducer,
  glasses: glassesReducer,
  dealer: dealerReducer,
  statistics: statisticsReducer,
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
