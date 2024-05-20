import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { NotificationComponent } from './notification/notification.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    EmailDirective,
    NotificationComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailDirective, NotificationComponent, LoaderComponent]
})
export class SharedModule { }
