import { DealerState, initialState } from '../models/dealer.store';
import { DealerActions, DealerActionTypes } from '../actions/dealer.actions';
import { DealerProfileModel } from '@api-client/public_api';

export function dealerReducer(state = initialState, action: DealerActions): DealerState {
  switch (action.type) {
    case DealerActionTypes.LoadDealerProfile:
      return { ...state, dealerProfile: null, isBusy: true };

    case DealerActionTypes.LoadNotificationTemplates:
      return { ...state, notificationTemplates: null, isBusy: true };

    case DealerActionTypes.DealerProfileLoaded: {
      const dealerProfile = action.payload;
      return { ...state, dealerProfile: dealerProfile, isBusy: false };
    }

    case DealerActionTypes.NotificationTemplatesLoaded: {
      const notificationTemplates = action.payload;
      return { ...state, notificationTemplates: notificationTemplates, isBusy: false };
    }

    case DealerActionTypes.UpdateDealerProfile:
    case DealerActionTypes.UpdateNotificationTemplate:
      return { ...state, isBusy: true };

    case DealerActionTypes.DealerProfileUpdated: {
      const updatedDealerProfile = action.payload;
      return { ...state, dealerProfile: { ...state.dealerProfile, ...updatedDealerProfile } as DealerProfileModel, isBusy: false };
    }

    case DealerActionTypes.NotificationTemplateUpdated: {
      const updatedTemplate = action.payload;
      const notificationTemplates = [...state.notificationTemplates];
      const idx = notificationTemplates.findIndex((c) => c.notificationType === updatedTemplate.notificationType);
      if (idx > -1) {
        notificationTemplates.splice(idx, 1, updatedTemplate);
      }
      return { ...state, notificationTemplates: notificationTemplates, isBusy: false };
    }

    case DealerActionTypes.LoadingDealerProfileFailed:
    case DealerActionTypes.UpdatingDealerProfileFailed:
    case DealerActionTypes.LoadingNotificationTemplatesFailed:
    case DealerActionTypes.UpdatingNotificationTemplateFailed:
      return { ...state, isBusy: false };

    default:
      return { ...state };
  }
}
