import { Action } from '@ngrx/store';
import { DealerProfileModel, NotificationTemplateModel } from '@api-client/public_api';

export enum DealerActionTypes {
  LoadDealerProfile = '[Opticon] Load Dealer Profile',
  DealerProfileLoaded = '[Opticon] Dealer Profile Loaded',
  LoadingDealerProfileFailed = '[Opticon] Loading Dealer Profile Failed',
  UpdateDealerProfile = '[Opticon] Update Dealer Profile',
  DealerProfileUpdated = '[Opticon] Dealer Profile Updated',
  UpdatingDealerProfileFailed = '[Opticon] Updating Dealer Profile Failed',
  LoadNotificationTemplates = '[Opticon] Load Notification Templates',
  NotificationTemplatesLoaded = '[Opticon] Notification Templates Profile Loaded',
  LoadingNotificationTemplatesFailed = '[Opticon] Loading Notification Templates Failed',
  UpdateNotificationTemplate = '[Opticon] Update Notification Template',
  NotificationTemplateUpdated = '[Opticon] Notification Template Updated',
  UpdatingNotificationTemplateFailed = '[Opticon] Updating Notification Template Failed',
}

export class LoadDealerProfileAction implements Action {
  readonly type = DealerActionTypes.LoadDealerProfile;
  constructor() {}
}

export class DealerProfileLoadedAction implements Action {
  readonly type = DealerActionTypes.DealerProfileLoaded;
  constructor(public payload: DealerProfileModel) {}
}

export class LoadingDealerProfileFailedAction implements Action {
  readonly type = DealerActionTypes.LoadingDealerProfileFailed;
}

export class UpdateDealerProfileAction implements Action {
  readonly type = DealerActionTypes.UpdateDealerProfile;
  constructor(public payload: DealerProfileModel) {}
}

export class DealerProfileUpdatedAction implements Action {
  readonly type = DealerActionTypes.DealerProfileUpdated;
  constructor(public payload: DealerProfileModel) {}
}

export class UpdatingDealerProfileFailedAction implements Action {
  readonly type = DealerActionTypes.UpdatingDealerProfileFailed;
}

export class LoadNotificationTemplatesAction implements Action {
  readonly type = DealerActionTypes.LoadNotificationTemplates;
  constructor() {}
}

export class NotificationTemplatesLoadedAction implements Action {
  readonly type = DealerActionTypes.NotificationTemplatesLoaded;
  constructor(public payload: NotificationTemplateModel[]) {}
}

export class LoadingNotificationTemplatesFailedAction implements Action {
  readonly type = DealerActionTypes.LoadingNotificationTemplatesFailed;
}

export class UpdateNotificationTemplateAction implements Action {
  readonly type = DealerActionTypes.UpdateNotificationTemplate;
  constructor(public payload: NotificationTemplateModel) {}
}

export class NotificationTemplateUpdatedAction implements Action {
  readonly type = DealerActionTypes.NotificationTemplateUpdated;
  constructor(public payload: NotificationTemplateModel) {}
}

export class UpdatingNotificationTemplateFailedAction implements Action {
  readonly type = DealerActionTypes.UpdatingNotificationTemplateFailed;
}

export type DealerActions =
  | LoadDealerProfileAction
  | DealerProfileLoadedAction
  | LoadingDealerProfileFailedAction
  | UpdateDealerProfileAction
  | DealerProfileUpdatedAction
  | UpdatingDealerProfileFailedAction
  | LoadNotificationTemplatesAction
  | NotificationTemplatesLoadedAction
  | LoadingNotificationTemplatesFailedAction
  | UpdateNotificationTemplateAction
  | NotificationTemplateUpdatedAction
  | UpdatingNotificationTemplateFailedAction;
