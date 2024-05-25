import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AuthActivate implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.userService.isUserLogged) {
            return true;
        }
        this.router.navigate(['/user/login']);
        return false;
    }
}