import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule, FormsModule, UserRoutingModule, RouterModule
  ]
})
export class UserModule { }
