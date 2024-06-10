import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
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
  ) { }

  form = this.fb.group({
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required]]
    },
      {
        validators: [matchPasswordsValidator('password', 'repeatPassword')]
      }),
  });

  domains: string[] = EMAIL_DOMAINS;

  register() {
    if (this.form.invalid) {
      return;
    }
    const { email, username, passGroup: { password, repeatPassword } = {} } = this.form.value;

    this.userService.register(email!, username!, password!, repeatPassword!).subscribe(() => {
      this.userService.login(email!, password!).subscribe();
      this.router.navigate(['/home'])
    }
    );
  }
}
