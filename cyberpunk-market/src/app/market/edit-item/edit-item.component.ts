import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MarketService } from '../market.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { numberValidator } from 'src/app/shared/utils/number-validator';
import { Item } from 'src/app/types/item';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private marketService: MarketService,
    private userService: UserService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  form = this.fb.group({
    item: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    imageUrl: ['', [Validators.required, urlValidator()]],
    price: ['', [Validators.required, numberValidator()]],
    availability: ['', [Validators.required]],
    type: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
  });

  item = {} as Item;
  itemId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => this.itemId = params['itemId']);
    this.marketService.getItem(this.itemId).subscribe(item => {
      this.item = item;

      this.form.setValue({
        item: this.item.item,
        imageUrl: this.item.imageUrl,
        price: this.item.price.toString(),
        availability: this.item.availability,
        type: this.item.type,
        description: this.item.description
      });
    });
  }

  handleEdit(): void {
    if (this.form.invalid) {
      return;
    }
 
    const { item, imageUrl, price, availability, type, description } = this.form.value;
    this.marketService.editItem(this.itemId, item!, imageUrl!, Number(price)!, availability!, type!, description!)
      .subscribe({
        next: () => this.router.navigate([`/market/${this.itemId}/details`]),
        error: (err) => {
          this.notification.setErrorMessage(err.message);
        }
      });
  }
}
