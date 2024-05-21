import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { CreateItemComponent } from './create-item/create-item.component';

const routes: Routes = [
  // { path: 'market', component: ItemsComponent },
  // { path: 'market/sell', component: CreateItemComponent }
  { path: 'market',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ItemsComponent
      },
      {
        path: 'sell',
        component: CreateItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MarketRoutingModule { }