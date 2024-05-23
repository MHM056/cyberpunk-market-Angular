import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Item } from '../types/item';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;

  getItems() {
    return this.http.get<Item[]>(`${this.apiUrl}/market/items`);
  }

  getItem(itemId: string) {
    return this.http.get<Item>(`${this.apiUrl}/market/items/${itemId}/details`);
  }

  createItem(item: string, imageUrl: string, price: number, availability: string, type: string, description: string, userId: string) {
    const itemData = { item, imageUrl, price, availability, type, description, userId };
    return this.http.post(`${this.apiUrl}/market/items`, itemData, { responseType: 'text' });
  }
}
