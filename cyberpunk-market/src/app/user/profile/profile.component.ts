import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { User, UserForAuth } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder) { }

  profileData: any = {
    _id: '',
    email: '',
    imageUrl: '',
    items: [],
    created_at: '',
    updatedAt:''
  };
 
  get userId(): string {
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(data => {
      this.profileData = data;
    });
  }
}
