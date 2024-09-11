import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiUrl = 'http://localhost:3000/api/sales'; // URL da sua API

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  // Outros métodos para adicionar, atualizar e deletar vendas
}
