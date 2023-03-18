import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNotificationEventModel, NotificationType } from '@api-client/public_api';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { CustomersActionTypes, CustomersNotifiedAction, NotifyCustomersAction } from '../../+state/actions/customers.actions';
import { CustomersState } from '../../+state/models/customers.store';
import { getCustomersBusy } from '../../+state/selectors/customers.selectors';

export interface CustomersNotification {
  title: string;
  message: string;
}

@Component({
  selector: 'app-customers-notifications-modal',
  templateUrl: './customers-notifications-modal.component.html',
  styleUrls: ['./customers-notifications-modal.component.scss'],
})
export class CustomersNotificationsModalComponent implements OnInit {
  public customersNotificationForm: FormGroup;
  public customerIds: number[] = [];
  public notificationType: NotificationType;
  public message: string;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private window: WindowRef,
    private fb: FormBuilder,
    private actionsSubj: ActionsSubject,
    private store: Store<CustomersState>
  ) {
    this.initForm();

    actionsSubj
      .pipe(
        filter((action) => action.type === CustomersActionTypes.CustomersNotified),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((action: CustomersNotifiedAction) => {
        this.window.close(action.payload);
      });

    this.store.pipe(select(getCustomersBusy), takeUntil(this.ngUnsubscribe)).subscribe((isLoading) => {
      if (isLoading) {
        this.customersNotificationForm.disable();
      } else {
        this.customersNotificationForm.enable();
      }
    });

    this.customersNotificationForm.get('message').valueChanges.subscribe((v) => (this.message = v));
  }

  ngOnInit() {}

  public submit() {
    if (this.customersNotificationForm.valid) {
      const notificationModel = {
        customerIds: this.customerIds,
        notificationType: this.notificationType,
        title: this.customersNotificationForm.value.title,
        message: this.customersNotificationForm.value.message,
      };
      this.store.dispatch(new NotifyCustomersAction(notificationModel as CreateNotificationEventModel));
    }
  }

  public close() {
    this.window.close();
  }

  private initForm() {
    this.customersNotificationForm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      message: this.fb.control('', [Validators.required]),
    });
  }
}
