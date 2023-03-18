import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerModel, NotificationType } from '@api-client/public_api';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DialogCloseResult, DialogRef, DialogService, WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { WindowRef, WindowSettings } from '@progress/kendo-angular-dialog/dist/es2015/window/window-settings';
import {
  AddEvent,
  EditEvent,
  GridDataResult,
  PageChangeEvent,
  RemoveEvent,
  SelectableSettings,
  SelectAllCheckboxState,
  SortSettings,
} from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { DEFAULT_DATE_FORMAT } from '@shared-web/public_api';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { debounceTime, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { LoadListAction, RemoveListItemAction } from '../+state/actions/customers.actions';
import { CustomersState } from '../+state/models/customers.store';
import { getCustomers, getCustomersBusy } from '../+state/selectors/customers.selectors';
import { AddNewCustomerModalComponent } from '../customer/add-new-customer-modal/add-new-customer-modal.component';
import {
  CustomersNotification,
  CustomersNotificationsModalComponent,
} from './customers-notifications-modal/customers-notifications-modal.component';

export enum ConfirmActionStatus {
  YES = 'yes',
  NO = 'no',
}

export interface IKendoSplitButtonSetting {
  text?: string;
  click?: () => void;
}

export interface IPagingChange {
  skip: number;
  idle: boolean;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  public customersDataLoading$: Observable<boolean>;
  private filterTerm = new FormControl('');
  private sort: Subject<SortDescriptor[]> = new Subject<SortDescriptor[]>();
  public sortValue: SortDescriptor[] = [];
  public sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'single',
  } as SortSettings;
  public selectableSettings: SelectableSettings = {
    checkboxOnly: true,
    mode: 'multiple',
  };
  public selectedCustomersIds: number[] = [];
  private skipChange: Subject<IPagingChange> = new Subject<IPagingChange>();
  public pageSize = 100;
  public skip = 0;
  public default_date_format = DEFAULT_DATE_FORMAT;
  private selectAllState: SelectAllCheckboxState = 'unchecked';
  private customers: CustomerModel[];
  public gridView: GridDataResult;
  public gridBusy: boolean;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private store: Store<CustomersState>,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private translate: TranslateService,
    private windowService: WindowService,
    private notificationService: NotificationService
  ) {
    combineLatest([
      this.store.pipe(select(getCustomers)),
      this.filterTerm.valueChanges.pipe(startWith('')),
      this.sort.pipe(startWith([])),
      this.skipChange.pipe(startWith({ skip: 0, idle: true })),
    ])
      .pipe(
        tap({ next: (result) => (this.gridBusy = result[3].idle) }),
        debounceTime(200),
        tap({next: ([, , , pageChange]) => (this.skip = pageChange.skip)}),
        map(([customers, filter, sort, pageChange]) => {
          const filteredCustomers = orderBy(this.filterCustomers(customers, filter), sort);

          return {
            data: filteredCustomers.slice(pageChange.skip, pageChange.skip + this.pageSize),
            total: filteredCustomers.length,
            allCustomers: customers,
          };
        })
      )
      .subscribe((customers) => {
        this.customers = customers.allCustomers;
        this.gridView = customers;
        this.gridBusy = false;
        this.updateCheckedState();
      });

    this.filterTerm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((_) => this.skipChange.next({ skip: 0, idle: true }));

    this.customersDataLoading$ = this.store.pipe(select(getCustomersBusy));

    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      if (params && params.errorText) {
        this.notificationService.show({
          content: params.errorText,
          cssClass: 'button-notification',
          animation: { type: 'slide', duration: 20 },
          position: { horizontal: 'center', vertical: 'top' },
          type: { style: 'error', icon: true },
        });
        this.router.navigate(['customers']);
      }
    });
  }

  public ngOnInit() {
    this.store.dispatch(new LoadListAction());
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sortValue = sort;
    this.sort.next(sort);
  }

  public addHandler(event: AddEvent) {
    this.openAddNewCustomerModalWindow();
  }

  public editHandler(event: EditEvent) {
    this.router.navigate([`customer/${event.dataItem.id}/edit`]);
  }

  public removeHandler(event: RemoveEvent) {
    this.showConfirmation(event.dataItem);
  }

  public pageChange(event: PageChangeEvent) {
    this.skipChange.next({ skip: event.skip, idle: false });
  }

  public handleScanClick() {
    this.router.navigate(['scanner']);
  }

  public sendAdvertisment(): void {
    const messageSettings = {
      all: this.customers.length === this.selectedCustomersIds.length,
      type: NotificationType.Advertising,
    };
    this.openCustomersNotificationsModalWindow(this.translate.instant('Advertisement'), messageSettings);
  }

  public sendInformation(): void {
    console.log(this.customers.length);
    console.log(this.selectedCustomersIds.length);

    const messageSettings = {
      all: this.customers.length === this.selectedCustomersIds.length,
      type: NotificationType.Info,
    };
    this.openCustomersNotificationsModalWindow(this.translate.instant('Information'), messageSettings);
  }

  public onSelectAllChange(checkedState: SelectAllCheckboxState): void {
    if (checkedState === 'checked') {
      this.selectedCustomersIds = this.customers.map((item) => item.id);
      this.selectAllState = 'checked';
    } else {
      this.selectedCustomersIds = [];
      this.selectAllState = 'unchecked';
    }
  }

  public onSelectedKeysChange(e: any): void {
    const len = this.selectedCustomersIds.length;

    if (len === 0) {
      this.selectAllState = 'unchecked';
    } else if (this.customers.length === this.selectedCustomersIds.length) {
      this.selectAllState = 'checked';
    } else {
      this.selectAllState = 'indeterminate';
    }
  }

  private updateCheckedState(): void {
    if (this.selectedCustomersIds.length === 0) {
      this.selectAllState = 'unchecked';
    } else if (this.customers.length === this.selectedCustomersIds.length) {
      this.selectAllState = 'checked';
    } else {
      this.selectAllState = 'indeterminate';
    }
  }

  private openAddNewCustomerModalWindow() {
    const window: WindowRef = this.windowService.open({
      title: this.translate.instant('Add new customer'),
      content: AddNewCustomerModalComponent,
    } as WindowSettings);

    window.result.subscribe((result: CustomerModel) => {
      if (!(result instanceof WindowCloseResult)) {
        this.router.navigate([`/customer/${result.id}/edit`]);
      }
    });
  }

  private openCustomersNotificationsModalWindow(title: string, messageSettings: { all: boolean; type: NotificationType }) {
    const window: WindowRef = this.windowService.open({
      title: title,
      content: CustomersNotificationsModalComponent,
    } as WindowSettings);

    window.content.instance.customerIds = messageSettings.all ? null : this.selectedCustomersIds;
    window.content.instance.notificationType = messageSettings.type;

    window.result.subscribe((result: CustomersNotification) => {
      if (!(result instanceof WindowCloseResult)) {
        console.log('Success');
      }
    });
  }

  private showConfirmation(dataItem: CustomerModel) {
    const dialog: DialogRef = this.dialogService.open({
      title: this.translate.instant('Please confirm'),
      content: this.translate.instant('Are you sure?'),
      actions: [
        { text: this.translate.instant(ConfirmActionStatus.NO) },
        { text: this.translate.instant(ConfirmActionStatus.YES), primary: true },
      ],
      width: 450,
      height: 200,
      minWidth: 250,
    });

    dialog.result.subscribe((result) => {
      if (!(result instanceof DialogCloseResult)) {
        if (result.text === this.translate.instant(ConfirmActionStatus.YES)) {
          this.store.dispatch(new RemoveListItemAction(dataItem.id));
        }
      }
    });
  }

  private filterCustomers(items: CustomerModel[], term: string): CustomerModel[] {
    const formatedTerm = term.toLowerCase();
    return items
      ? items.filter((item: CustomerModel) => {
          return (
            (item.firstname && item.firstname.toLowerCase().indexOf(formatedTerm) > -1) ||
            (item.lastname && item.lastname.toLowerCase().indexOf(formatedTerm) > -1) ||
            (item.phone && item.phone.toLowerCase().indexOf(formatedTerm) > -1) ||
            (item.address && item.address.toLowerCase().indexOf(formatedTerm) > -1) ||
            (item.email && item.email.toLowerCase().indexOf(formatedTerm) > -1) ||
            (item.birthDate && new DatePipe('de-DE').transform(item.birthDate, this.default_date_format).indexOf(formatedTerm) > -1)
          );
        })
      : [];
  }
}
