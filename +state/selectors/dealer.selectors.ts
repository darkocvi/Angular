import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BIRTHDAY_MESSAGES, CUSTOMER_ACTIONS, DealerState, USER_NOTIFICATIONS } from '../models/dealer.store';

export const getDealerState = createFeatureSelector('dealer');

export const getDealerBusy = createSelector(getDealerState, (state: DealerState) => state.isBusy);

export const getDealerProfile = createSelector(getDealerState, (state: DealerState) => state.dealerProfile);

export const getUserNotificationTemplates = createSelector(getDealerState, (state: DealerState) =>
  state.notificationTemplates ? state.notificationTemplates.filter((nt) => USER_NOTIFICATIONS.indexOf(nt.notificationType) > -1) : null
);

export const getCustomerActionsTemplates = createSelector(getDealerState, (state: DealerState) =>
  state.notificationTemplates ? state.notificationTemplates.filter((nt) => CUSTOMER_ACTIONS.indexOf(nt.notificationType) > -1) : null
);

export const getBirthdayMessagesTemplates = createSelector(getDealerState, (state: DealerState) =>
  state.notificationTemplates ? state.notificationTemplates.filter((nt) => BIRTHDAY_MESSAGES.indexOf(nt.notificationType) > -1) : null
);
