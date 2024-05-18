import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(
    private userService: UserService, 
    private route: Router, 
    private notificationService: NotificationService
  ) { }

  domains: string[] = EMAIL_DOMAINS;
  isLoading: boolean = false;

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    const { email, password } = form.value;
    this.userService.login(email, password).subscribe(
      () => this.route.navigate(['/home']),
      err => {
        this.isLoading = false;
        this.notificationService.setErrorMessage(err.error.error)
      }
    );
  }
}
