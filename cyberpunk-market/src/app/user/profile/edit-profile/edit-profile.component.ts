import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
  }

  profileData: any = {
    _id: '',
    email: '',
    imageUrl: '',
    items: [],
    created_at: '',
    updatedAt: ''
  };

  get userId(): string {
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(data => {
      this.profileData = data;
      this.form.setValue({
        imageUrl: this.profileData.imageUrl,
        username: this.profileData.username,
        // passGroup: {
        //   password: '',
        //   repeatPassword: ''
        // }
      })
    });
  }
  form = this.fb.group({
    imageUrl: ['', [urlValidator()]],
    username: ['', [Validators.minLength(3), Validators.maxLength(12)]],
    // passGroup: this.fb.group({
    //   password: ['', [Validators.required, Validators.minLength(4)]],
    //   repeatPassword: ['', [Validators.required]]
    // },
    //   {
    //     validators: [matchPasswordsValidator('password', 'repeatPassword')]
    //   }),
  })

  onCancel(): void {
    this.router.navigate(['/user/profile'])
  }
  edit(): void {
    if (this.form.invalid) {
      return;
    }

    const { imageUrl, username } = this.form.value;
    this.userService.updateProfile({ imageUrl, username })
    .subscribe({
      next: () => this.router.navigate(['/user/profile']),
    })
  }
}
