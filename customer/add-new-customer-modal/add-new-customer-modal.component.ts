import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerCreateModel, IGender } from '@api-client/public_api';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DEFAULT_DATE_FORMAT, PHONE_PATTERN } from '@shared-web/public_api';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { AddNewCustomerAction, CustomerActionTypes, NewCustomerAddedAction } from '../../+state/actions/customer.actions';
import { CustomersState } from '../../+state/models/customers.store';
import { getCustomersBusy } from '../../+state/selectors/customers.selectors';

@Component({
  selector: 'app-add-new-customer-modal',
  templateUrl: './add-new-customer-modal.component.html',
  styleUrls: ['./add-new-customer-modal.component.scss'],
})
export class AddNewCustomerModalComponent implements OnInit, OnDestroy {
  public addNewCustomerForm: FormGroup;
  public default_date_format = DEFAULT_DATE_FORMAT;
  public genders = Object.keys(IGender).map((k) => ({
    title: this.translate.instant(IGender[k]),
    value: IGender[k],
  }));

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private window: WindowRef,
    private fb: FormBuilder,
    private actionsSubj: ActionsSubject,
    private store: Store<CustomersState>,
    private translate: TranslateService
  ) {
    this.initForm();

    actionsSubj
      .pipe(
        filter((action) => action.type === CustomerActionTypes.NewCustomerAdded),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((action: NewCustomerAddedAction) => {
        this.window.close(action.payload);
      });

    this.store.pipe(select(getCustomersBusy), takeUntil(this.ngUnsubscribe)).subscribe((isLoading) => {
      if (isLoading) {
        this.addNewCustomerForm.disable();
      } else {
        this.addNewCustomerForm.enable();
      }
    });
  }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submit() {
    if (this.addNewCustomerForm.valid) {
      this.store.dispatch(new AddNewCustomerAction(new CustomerCreateModel(this.addNewCustomerForm.value)));
    }
  }

  public close() {
    this.window.close();
  }

  private initForm() {
    this.addNewCustomerForm = this.fb.group({
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
