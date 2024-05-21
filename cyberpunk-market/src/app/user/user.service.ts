import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$$ = new BehaviorSubject<any | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  get isUserLogged(): boolean {
    return !!this.user;
  }

  user: any | undefined;
  userSubscription: Subscription;

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => this.user = user);
  }

  register(email: string, password: string, repeatPassword: string) {
    return this.http
      .post<UserForAuth>(`${this.apiUrl}/users/register`, {
        email,
        password,
        repeatPassword
      }, { withCredentials: true })
      .pipe(tap(user => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${this.apiUrl}/users/login`, { email, password }, { withCredentials: true })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http.post(`${this.apiUrl}/users/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.user$$.next(undefined)));
  }
}
