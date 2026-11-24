import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Habito, HabitoPayload } from '../models/habito.model';

@Injectable({ providedIn: 'root' })
export class HabitoService {
  private readonly apiUrl = 'http://localhost:8080/api/habitos';

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Habito[]> {
    return this.http.get<Habito[]>(this.apiUrl).pipe(catchError((erro) => this.tratarErro(erro)));
  }

  buscarPorId(id: number): Observable<Habito> {
    return this.http.get<Habito>(`${this.apiUrl}/${id}`).pipe(catchError((erro) => this.tratarErro(erro)));
  }

  cadastrar(obj: HabitoPayload): Observable<Habito> {
    return this.http.post<Habito>(this.apiUrl, obj).pipe(catchError((erro) => this.tratarErro(erro)));
  }

  atualizar(id: number, obj: HabitoPayload): Observable<Habito> {
    return this.http.put<Habito>(`${this.apiUrl}/${id}`, obj).pipe(catchError((erro) => this.tratarErro(erro)));
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError((erro) => this.tratarErro(erro)));
  }

  executarRegra(id: number, params?: any): Observable<Habito> {
    return this.http.post<Habito>(`${this.apiUrl}/${id}/checkin`, params ?? null)
      .pipe(catchError((erro) => this.tratarErro(erro)));
  }

  private tratarErro(erro: HttpErrorResponse): Observable<never> {
    let mensagem = 'Não foi possível concluir a operação. Tente novamente.';

    if (erro.status === 400) {
      mensagem = 'Não foi possível concluir a operação. Verifique os dados informados.';
      alert(mensagem);
    } else if (erro.status === 409) {
      mensagem = 'Não foi possível concluir a operação porque há um conflito nos dados.';
      alert(mensagem);
    } else if (erro.status === 0) {
      mensagem = 'Não foi possível conectar ao servidor. Confirme se o back-end está em execução.';
    } else if (erro.status === 404) {
      mensagem = 'O hábito solicitado não foi encontrado.';
    }

    return throwError(() => new Error(mensagem));
  }
}
