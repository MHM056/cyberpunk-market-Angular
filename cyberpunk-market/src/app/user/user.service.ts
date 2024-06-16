import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User, UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<any | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  get isUserLogged(): boolean {
    return !!this.user;
  }

  get userId(): string {
    return this.user?._id || '';
  }

  user: any | undefined;
  userSubscription: Subscription;

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => this.user = user);
  }

  register(email: string, username: string, password: string, repeatPassword: string) {
    return this.http
      .post<UserForAuth>(`${this.apiUrl}/users/register`, {
        email,
        username,
        password,
        repeatPassword
      })
      .pipe(tap(user => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http.post(`${this.apiUrl}/users/logout`, {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>(`${this.apiUrl}/users/profile`)
      .pipe(tap(user => this.user$$.next(user)))
  }

  updateProfile(userData: object) {
    return this.http
    .put<User>(`${this.apiUrl}/users/profile`, userData)
    .pipe(tap(user => this.user$$.next(user)))
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
