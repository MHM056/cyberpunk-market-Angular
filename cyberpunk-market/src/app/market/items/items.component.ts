import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { UserService } from 'src/app/user/user.service';
import { Item } from 'src/app/types/item';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
    constructor(private marketService: MarketService, private userService: UserService, private notification: NotificationService ) {}
    
    items: Item[] = [];
    isLoading: boolean = false;

    get isLogged(): boolean {
      return this.userService.isUserLogged;
    }

    get userId(): string {
      return this.userService.user?._id || '';
    }

    ngOnInit(): void {
      this.isLoading = true;
      this.marketService.getItems().subscribe({
        next: (items) => {
          this.items = items;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          
          this.notification.setErrorMessage(err);
          this.isLoading = false;
        }
      })
    }
}
