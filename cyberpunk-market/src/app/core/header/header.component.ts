import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) { }

  get isLogged(): boolean {
    return this.userService.isUserLogged;
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => this.router.navigate(['/home'])
    })
  }
}
