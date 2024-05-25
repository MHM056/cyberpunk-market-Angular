import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { MarketRoutingModule } from './market-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateItemComponent } from './create-item/create-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { EditItemComponent } from './edit-item/edit-item.component';



@NgModule({
  declarations: [
    ItemsComponent,
    CreateItemComponent,
    ItemDetailsComponent,
    EditItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    MarketRoutingModule,
  ],
})
export class MarketModule { }
