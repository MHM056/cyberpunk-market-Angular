import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { Item } from 'src/app/types/item';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  constructor(
    private marketService: MarketService,
    private userService: UserService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  item = {} as Item;
  itemId: string = '';

  get userId(): string {
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.itemId = params['itemId']);

    this.marketService.getItem(this.itemId).subscribe(item => this.item = item);
  }

  deleteHandler() {
    if (this.userId === this.item.userId) {
      const isConfirmed = confirm('Are you sure you want to delete this item');
      if (isConfirmed) {
        this.marketService.deleteItem(this.item._id).subscribe({
          next: () => this.router.navigate(['/market']),
          error: (err) => this.notification.setErrorMessage(err.message)
        })
      }
    }

  }
}
