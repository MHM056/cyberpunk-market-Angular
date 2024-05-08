import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }
}
