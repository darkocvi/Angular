import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerPurchaseModel } from '@api-client/public_api';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NUMERIC_TWO_DOTS_FORMAT } from '@shared-web/public_api';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { CustomerActionTypes, CustomerPurchaseEnteredAction, EnterCustomerPurchaseAction } from '../../+state/actions/customer.actions';
import { CustomerState } from '../../+state/models/customer.store';
import { getSelectedCustomerBusy } from '../../+state/selectors/customer.selectors';

@Component({
  selector: 'app-enter-customer-purchase-modal',
  templateUrl: './enter-customer-purchase-modal.component.html',
  styleUrls: ['./enter-customer-purchase-modal.component.scss'],
})
export class EnterCustomerPurchaseModalComponent implements OnInit, OnDestroy {
  public enterCustomerPurchaseForm: FormGroup;
  public customerId = 0;
  public numberc_two_dots_format = NUMERIC_TWO_DOTS_FORMAT;
  public decimalsAllowed = 2;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private window: WindowRef,
    private fb: FormBuilder,
    private actionsSubj: ActionsSubject,
    private store: Store<CustomerState>
  ) {
    this.initForm();

    actionsSubj
      .pipe(
        filter((action) => action.type === CustomerActionTypes.CustomerPurchaseEntered),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((action: CustomerPurchaseEnteredAction) => {
        this.window.close(true);
      });

    this.store.pipe(select(getSelectedCustomerBusy), takeUntil(this.ngUnsubscribe)).subscribe((isLoading) => {
      if (isLoading) {
        this.enterCustomerPurchaseForm.disable();
      } else {
        this.enterCustomerPurchaseForm.enable();
      }
    });
  }

  ngOnInit() {}

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submit() {
    if (this.enterCustomerPurchaseForm.valid) {
      const customerPurchase = {
        customerId: this.customerId,
        value: this.enterCustomerPurchaseForm.value.purchase,
      };
      this.store.dispatch(new EnterCustomerPurchaseAction(new CustomerPurchaseModel(customerPurchase)));
    }
  }

  public close() {
    this.window.close();
  }

  private initForm() {
    this.enterCustomerPurchaseForm = this.fb.group({
      purchase: this.fb.control('', [Validators.required]),
    });
  }
}
