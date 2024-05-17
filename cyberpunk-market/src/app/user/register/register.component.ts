import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  form = this.fb.group({
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required]]
    },
      {
        validators: [matchPasswordsValidator('password', 'repeatPassword')]
      }),
  });

  domains: string[] = EMAIL_DOMAINS;
  isLoading: boolean = false;

  register() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const { email, passGroup: { password, repeatPassword } = {} } = this.form.value;

    this.userService.register(email!, password!, repeatPassword!).subscribe(
      () => this.router.navigate(['/home']),
      err => {
        this.isLoading = false;
        if (err.statusText === "Unknown Error") {
          this.notificationService.setErrorMessage(`${err.statusText}, please try again later`);
        } else {
          this.notificationService.setErrorMessage(err.error)
        }
      }
    );
  }
}
