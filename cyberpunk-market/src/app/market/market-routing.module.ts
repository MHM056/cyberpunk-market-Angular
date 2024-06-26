import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AuthActivate } from '../guards/auth.activate';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditActivate } from '../guards/edit.activate';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ItemsComponent },
  { path: 'sell', component: CreateItemComponent, canActivate: [AuthActivate] },
  { path: ':itemId/details', component: ItemDetailsComponent },
  { path: ':itemId/edit', component: EditItemComponent, canActivate: [EditActivate] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MarketRoutingModule { }