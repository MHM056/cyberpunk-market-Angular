import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { MarketService } from '../market.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {
  constructor(private userService: UserService, private marketService: MarketService, private notification: NotificationService) { }

  handleCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const userId = this.userService.user?._id || '';
    console.log(userId);
    
  }
}
