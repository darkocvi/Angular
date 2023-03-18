import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerRedeemPointsModel } from '@api-client/public_api';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { NUMERIC_TWO_DOTS_FORMAT } from '@shared-web/public_api';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { CustomerActionTypes, CustomerPointsRedeemedAction, RedeemCustomerPointsAction } from '../../+state/actions/customer.actions';
import { CustomerState } from '../../+state/models/customer.store';
import { getSelectedCustomerBusy } from '../../+state/selectors/customer.selectors';

@Component({
  selector: 'app-redeem-customer-points-modal',
  templateUrl: './redeem-customer-points-modal.component.html',
  styleUrls: ['./redeem-customer-points-modal.component.scss'],
})
export class RedeemCustomerPointsModalComponent implements OnInit, OnDestroy {
  public redeemCustomerPointsForm: FormGroup;
  public customerId = 0;
  public numberc_two_dots_format = NUMERIC_TWO_DOTS_FORMAT;

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
        filter((action) => action.type === CustomerActionTypes.CustomerPointsRedeemed),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((action: CustomerPointsRedeemedAction) => {
        this.window.close(true);
      });

    this.store.pipe(select(getSelectedCustomerBusy), takeUntil(this.ngUnsubscribe)).subscribe((isLoading) => {
      if (isLoading) {
        this.redeemCustomerPointsForm.disable();
      } else {
        this.redeemCustomerPointsForm.enable();
      }
    });
  }

  ngOnInit() {}

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submit() {
    if (this.redeemCustomerPointsForm.valid) {
      const customerPoints = {
        customerId: this.customerId,
        value: this.redeemCustomerPointsForm.value.points,
      };
      this.store.dispatch(new RedeemCustomerPointsAction(new CustomerRedeemPointsModel(customerPoints)));
    }
  }

  public close() {
    this.window.close();
  }

  private initForm() {
    this.redeemCustomerPointsForm = this.fb.group({
      points: this.fb.control('', [Validators.required]),
    });
  }
}
