import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { MarketRoutingModule } from './market-routing.module';



@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
