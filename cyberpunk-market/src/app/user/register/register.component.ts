import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { EMAIL_DOMAINS } from 'src/app/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private route: Router,
    private notificationService: NotificationService
  ) { }

  domains: string[] = EMAIL_DOMAINS;

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form.value);
    
  }
}
