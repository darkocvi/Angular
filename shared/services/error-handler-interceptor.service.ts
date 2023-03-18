import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '@progress/kendo-angular-notification';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class ErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(event: HttpErrorResponse) {
    this.showErrorToast(event.message);
    return _throw(event);
  }

  private showErrorToast(text: string) {
    this.notificationService.show({
      content: text,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 20 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style: 'error', icon: true },
    });
  }
}
