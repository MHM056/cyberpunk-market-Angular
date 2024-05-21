import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { NotificationComponent } from './notification/notification.component';
import { LoaderComponent } from './loader/loader.component';
import { UrlDirective } from './validators/url.directive';
import { NumberDirective } from './validators/number.directive';



@NgModule({
  declarations: [
    UrlDirective,
    EmailDirective,
    NotificationComponent,
    LoaderComponent,
    NumberDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailDirective, UrlDirective, NumberDirective, NotificationComponent, LoaderComponent]
})
export class SharedModule { }
