import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:3000/api/sales'; // Atualize aqui

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  addSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale);
  }

  updateSale(id: string, sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/${id}`, sale);
  }

  deleteSale(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteSalesByProductId(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/${productId}`);
  }

  // Método para buscar vendas por ID de produto
  getSalesByProductId(productId: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/product/${productId}`);
  }
}
