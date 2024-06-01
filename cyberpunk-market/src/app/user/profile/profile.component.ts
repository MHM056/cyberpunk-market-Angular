import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private userService: UserService) {}

  profileData: any = {};

  get userId(): string {
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(data => {
      this.profileData = data;
      console.log(this.profileData);
      
  });
    
  }
}
