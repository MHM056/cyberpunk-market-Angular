import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { MarketRoutingModule } from './market-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateItemComponent } from './create-item/create-item.component';



@NgModule({
  declarations: [
    ItemsComponent,
    CreateItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
