import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder) { }

  profileData: User = {
    _id: '',
    email: '',
    imageUrl: '',
    password: '',
    items: [],
    created_at: '',
    updatedAt: '',
    __v: ''
  };
  isToggled = true;

  form = this.fb.group({
    imageUrl: ['', Validators.required, urlValidator()],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required]]
    },
      {
        validators: [matchPasswordsValidator('password', 'repeatPassword')]
      }),
  })

  get userId(): string {
    return this.userService.user?._id || '';
  }

  onToggle(): boolean {
    return this.isToggled = !this.isToggled;
  }
 
  edit(): void {
      console.log(this.form.value);
      
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(data => {
      this.profileData = data;
      console.log(this.profileData);
    });

    this.form.setValue({
      imageUrl: this.profileData.imageUrl,

    })

  }
}
