import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { Item } from 'src/app/types/item';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  constructor(private marketService: MarketService, private userService: UserService, private route: ActivatedRoute) {}

  item = {} as Item;
  itemId: string = '';

  get userId(): string {
    return this.userService.user?._id || '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.itemId = params['itemId']);

    this.marketService.getItem(this.itemId).subscribe(item => this.item = item);
  }


}
