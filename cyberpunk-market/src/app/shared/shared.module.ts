import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    EmailDirective,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailDirective, NotificationComponent]
})
export class SharedModule { }
