import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { MarketRoutingModule } from './market-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
