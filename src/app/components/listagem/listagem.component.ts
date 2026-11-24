import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Habito } from '../../models/habito.model';
import { HabitoService } from '../../services/habito.service';

@Component({
  selector: 'app-listagem', standalone: true, imports: [NgFor, NgIf, RouterLink],
  templateUrl: './listagem.component.html', styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  private readonly habitoService = inject(HabitoService);
  private readonly route = inject(ActivatedRoute);
  habitos: Habito[] = [];
  carregando = true;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const sucesso = params.get('sucesso');
      if (sucesso) this.exibirMensagem(sucesso, 'sucesso');
      this.carregarHabitos();
    });
  }

  carregarHabitos(): void {
    this.carregando = true;
    this.habitoService.listar().subscribe({
      next: (habitos) => { this.habitos = habitos; this.carregando = false; },
      error: (erro: Error) => { this.carregando = false; this.exibirMensagem(erro.message, 'erro'); }
    });
  }

  executarCheckin(habito: Habito): void {
    this.habitoService.executarRegra(habito.id).subscribe({
      next: (atualizado) => {
        this.habitos = this.habitos.map((item) => item.id === atualizado.id ? atualizado : item);
        this.exibirMensagem(`Check-in de \"${atualizado.descricao}\" realizado com sucesso.`, 'sucesso');
      },
      error: (erro: Error) => this.exibirMensagem(erro.message, 'erro')
    });
  }

  excluir(habito: Habito): void {
    if (!confirm(`Deseja excluir o hábito \"${habito.descricao}\"?`)) return;
    this.habitoService.excluir(habito.id).subscribe({
      next: () => {
        this.habitos = this.habitos.filter((item) => item.id !== habito.id);
        this.exibirMensagem('Hábito excluído com sucesso.', 'sucesso');
      },
      error: (erro: Error) => this.exibirMensagem(erro.message, 'erro')
    });
  }

  private exibirMensagem(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = mensagem;
    this.tipoMensagem = tipo;
  }
}
