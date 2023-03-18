import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CustomerDetailsModel, CustomerModel, IGender, NotificationType } from '@api-client/public_api';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { WindowCloseResult, WindowRef, WindowService, WindowSettings } from '@progress/kendo-angular-dialog';
import { DEFAULT_DATE_FORMAT, PHONE_PATTERN } from '@shared-web/public_api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  CustomerActionTypes,
  EditCustomerAction,
  LoadCustomerAction,
  LoadCustomerPointsAction,
  LoadingCustomerFailedAction,
} from '../../+state/actions/customer.actions';
import { CustomerState } from '../../+state/models/customer.store';
import { getSelectedCustomer, getSelectedCustomerBusy } from '../../+state/selectors/customer.selectors';
import {
  CustomersNotification,
  CustomersNotificationsModalComponent,
} from '../../customers/customers-notifications-modal/customers-notifications-modal.component';
import { getDateOnly } from '../../shared/helpers/date.helper';
import { EnterCustomerPurchaseModalComponent } from '../enter-customer-purchase-modal/enter-customer-purchase-modal.component';
import { RedeemCustomerPointsModalComponent } from '../redeem-customer-points-modal/redeem-customer-points-modal.component';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
})
export class EditCustomerComponent implements OnInit, OnDestroy {
  public editCustomerForm: FormGroup;
  public editCustomer: CustomerDetailsModel = null;
  public default_date_format = DEFAULT_DATE_FORMAT;
  public genders = Object.keys(IGender).map((k) => ({
    title: this.translate.instant(IGender[k]),
    value: IGender[k],
  }));
  public points = 0;

  private ngUnsubscribe: Subject<any> = new Subject();
  private customerId: number;

  constructor(
    private store: Store<CustomerState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private windowService: WindowService,
    private translate: TranslateService,
    private actionsSubj: ActionsSubject
  ) {
    this.initForm();
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      const id = +params['id'];
      if (id >= 0) {
        this.customerId = id;
        this.store.dispatch(new LoadCustomerAction(id));
      }
    });

    this.store.pipe(select(getSelectedCustomer), takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result) {
        this.editCustomer = result;
        this.points = Math.floor(this.editCustomer.points);
        this.customerId = this.editCustomer.id;
        this.setEditCustomerForm(result);
      }
    });

    this.store.pipe(select(getSelectedCustomerBusy), takeUntil(this.ngUnsubscribe)).subscribe((isLoading) => {
      if (isLoading) {
        this.editCustomerForm.disable();
      } else {
        this.editCustomerForm.enable();
      }
    });

    actionsSubj
      .pipe(
        filter((action) => action.type === CustomerActionTypes.LoadingCustomerFailed),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((action: LoadingCustomerFailedAction) => {
        if (action.payload.status === 404) {
          const errorText = this.translate.instant(`Customer not found.`, { value: this.customerId });
          const extras: NavigationExtras = {
            queryParams: { errorText },
          };
          this.router.navigate(['customers'], extras);
        }
      });
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submit() {
    if (this.editCustomerForm.valid) {
      const editedCustomer = {
        id: this.editCustomer.id,
        ...this.editCustomerForm.value,
        birthDate: this.editCustomerForm.value.birthDate ? getDateOnly(this.editCustomerForm.value.birthDate) : null,
      } as CustomerModel;

      this.store.dispatch(new EditCustomerAction(editedCustomer));
    }
  }

  public enterPurchase() {
    this.openEnterCustomerPurchaseModalWindow();
  }

  public redeemPoints() {
    this.openRedeemCustomerPointsModalWindow();
  }

  public sendAdvertisement() {
    const messageSettings = {
      all: false,
      type: NotificationType.Advertising,
    };
    this.openCustomersNotificationsModalWindow(this.translate.instant('Send advertisement'), messageSettings);
  }

  public sendInformation() {
    const messageSettings = {
      all: false,
      type: NotificationType.Info,
    };
    this.openCustomersNotificationsModalWindow(this.translate.instant('Information'), messageSettings);
  }

  private openEnterCustomerPurchaseModalWindow() {
    const window: WindowRef = this.windowService.open({
      title: this.translate.instant('Enter purchase'),
      content: EnterCustomerPurchaseModalComponent,
    } as WindowSettings);

    window.content.instance.customerId = this.editCustomer.id;

    window.result.subscribe((result: any) => {
      if (!(result instanceof WindowCloseResult)) {
        this.store.dispatch(new LoadCustomerPointsAction(this.editCustomer.id));
      }
    });
  }

  private openRedeemCustomerPointsModalWindow() {
    const window: WindowRef = this.windowService.open({
      title: this.translate.instant('Redeem points'),
      content: RedeemCustomerPointsModalComponent,
    } as WindowSettings);

    window.content.instance.customerId = this.editCustomer.id;

    window.result.subscribe((result: any) => {
      if (!(result instanceof WindowCloseResult)) {
        this.store.dispatch(new LoadCustomerPointsAction(this.editCustomer.id));
      }
    });
  }

  private openCustomersNotificationsModalWindow(title: string, messageSettings: { all: boolean; type: NotificationType }) {
    const window: WindowRef = this.windowService.open({
      title: title,
      content: CustomersNotificationsModalComponent,
    } as WindowSettings);

    window.content.instance.customerIds = [this.editCustomer.id];
    window.content.instance.notificationType = messageSettings.type;

    window.result.subscribe((result: CustomersNotification) => {
      if (!(result instanceof WindowCloseResult)) {
        console.log('Success');
      }
    });
  }

  private setEditCustomerForm(value: CustomerDetailsModel) {
    this.editCustomerForm.setValue({
      firstname: value.firstname,
      lastname: value.lastname,
      phone: value.phone,
      address: value.address,
      email: value.email,
      birthDate: value.birthDate,
      gender: value.gender,
    });
  }

  private initForm() {
    this.editCustomerForm = this.fb.group({
      firstname: this.fb.control('', [Validators.required]),
      lastname: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required, Validators.pattern(PHONE_PATTERN)]),
      address: this.fb.control('', []),
      email: this.fb.control('', [Validators.email]),
      birthDate: this.fb.control('', []),
      gender: this.fb.control('', []),
    });
  }
}
