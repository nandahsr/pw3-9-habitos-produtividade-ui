import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habito } from '../models/habito.model';

@Injectable({ providedIn: 'root' })
export class HabitoService {
  private readonly url = 'http://localhost:8080/api/habitos';
  constructor(private http: HttpClient) {}

  listar(): Observable<Habito[]> { return this.http.get<Habito[]>(this.url); }
  buscarPorId(id: number): Observable<Habito> { return this.http.get<Habito>(`${this.url}/${id}`); }
  cadastrar(obj: Pick<Habito, 'descricao' | 'metaDias'>): Observable<Habito> { return this.http.post<Habito>(this.url, obj); }
  atualizar(id: number, obj: Pick<Habito, 'descricao' | 'metaDias'>): Observable<Habito> { return this.http.put<Habito>(`${this.url}/${id}`, obj); }
  excluir(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
  executarRegra(id: number): Observable<Habito> { return this.http.post<Habito>(`${this.url}/${id}/checkin`, {}); }
}
