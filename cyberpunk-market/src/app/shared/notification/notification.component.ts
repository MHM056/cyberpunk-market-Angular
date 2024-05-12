import { AfterContentInit, Component } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements AfterContentInit {
  constructor(private service: NotificationService) { }

  error: any = this.service.errorMessageAction$;

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.service.clearErrorMessage();
      this.error = this.service.errorMessageAction$;
    }, 7000);
  }
}
