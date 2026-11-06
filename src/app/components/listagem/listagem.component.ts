import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Habito } from '../../models/habito.model';
import { HabitoService } from '../../services/habito.service';

@Component({
  selector: 'app-listagem', standalone: true, imports: [RouterLink],
  templateUrl: './listagem.component.html', styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  habitos: Habito[] = [];
  sucesso = '';
  erro = '';
  constructor(private habitoService: HabitoService) {}

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.habitoService.listar().subscribe({
      next: habitos => this.habitos = habitos,
      error: erro => this.mostrarErro(erro)
    });
  }

  checkin(habito: Habito): void {
    this.limparMensagens();
    this.habitoService.executarRegra(habito.id).subscribe({
      next: atualizado => {
        this.habitos = this.habitos.map(item => item.id === atualizado.id ? atualizado : item);
        this.sucesso = 'Check-in registrado com sucesso!';
      },
      error: erro => this.mostrarErro(erro)
    });
  }

  excluir(habito: Habito): void {
    if (!confirm(`Excluir o hábito "${habito.descricao}"?`)) return;
    this.limparMensagens();
    this.habitoService.excluir(habito.id).subscribe({
      next: () => {
        this.habitos = this.habitos.filter(item => item.id !== habito.id);
        this.sucesso = 'Hábito excluído com sucesso!';
      },
      error: erro => this.mostrarErro(erro)
    });
  }

  private limparMensagens(): void { this.erro = ''; this.sucesso = ''; }
  private mostrarErro(erro: HttpErrorResponse): void {
    this.sucesso = '';
    const mensagem = erro.error?.mensagem;
    this.erro = typeof mensagem === 'string' ? mensagem : 'Não foi possível comunicar com o backend.';
  }
}
