import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { NotificationComponent } from './notification/notification.component';
import { LoaderComponent } from './loader/loader.component';
import { UrlDirective } from './validators/url.directive';



@NgModule({
  declarations: [
    UrlDirective,
    EmailDirective,
    NotificationComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [EmailDirective, UrlDirective, NotificationComponent, LoaderComponent]
})
export class SharedModule { }
