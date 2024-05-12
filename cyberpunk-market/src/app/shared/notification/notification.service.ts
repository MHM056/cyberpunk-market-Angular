import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  setErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }

  clearErrorMessage(): void {
    this.setErrorMessage('');
  }
}
