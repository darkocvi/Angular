import { DealerProfileModel, NotificationTemplateModel, NotificationType } from '@api-client/public_api';

export interface DealerState {
  dealerProfile: DealerProfileModel;
  notificationTemplates: NotificationTemplateModel[];
  isBusy: boolean;
}

export const initialState: DealerState = {
  dealerProfile: null,
  notificationTemplates: null,
  isBusy: false,
};

export const USER_NOTIFICATIONS = [
  NotificationType.Welcome,
  NotificationType.CustomerSatisfaction,
  NotificationType.Service,
  NotificationType.Service2,
  NotificationType.Service3,
  NotificationType.WarrantyCheck,
  NotificationType.EyeCheck,
];

export const CUSTOMER_ACTIONS = [NotificationType.MoreCustomerAction, NotificationType.MoreCustomerAction2];

export const BIRTHDAY_MESSAGES = [NotificationType.Birthday];
