import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { MarketService } from '../market.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {
  constructor(
    private userService: UserService,
    private marketService: MarketService,
    private router: Router,
    private notification: NotificationService) { }

  handleCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const userId = this.userService.user?._id || '';
    if (userId) {
      const { item, imageUrl, price, availability, type, description } = form.value;
      this.marketService.createItem(item, imageUrl, price, availability, type, description, userId).subscribe({
        next: () => this.router.navigate(['/market']),
        error: (err) => this.notification.setErrorMessage(err.error)
      })
    }
  }
}
