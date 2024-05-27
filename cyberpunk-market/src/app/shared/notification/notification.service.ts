import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  setErrorMessage(error: any): void {
    this.errorMessageSubject.next(error.error);
  }

  clearErrorMessage(): void {
    this.setErrorMessage('');
  }
}
