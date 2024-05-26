import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MarketService } from "../market/market.service";
import { UserService } from "../user/user.service";
import { Item } from "../types/item";

@Injectable({ providedIn: 'root' })

export class EditActivate implements CanActivate {
    constructor(private marketService: MarketService, private userService: UserService, private router: Router) { }
    
    item = {} as Item;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const itemId = state.url.split('/')[2];
        this.marketService.getItem(itemId).subscribe(item => this.item = item);

        if (this.item.userId === this.userService.userId) {
            return true;
        }

        this.router.navigate(['/market']);
        return false;
    }
}