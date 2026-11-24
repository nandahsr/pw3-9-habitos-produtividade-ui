import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HabitoPayload } from '../../models/habito.model';
import { HabitoService } from '../../services/habito.service';

@Component({ selector: 'app-formulario', standalone: true, imports: [NgIf, ReactiveFormsModule, RouterLink], templateUrl: './formulario.component.html', styleUrl: './formulario.component.css' })
export class FormularioComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly habitoService = inject(HabitoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly formulario = this.formBuilder.nonNullable.group({ descricao: ['', [Validators.required]], metaDias: [1, [Validators.required, Validators.min(1)]] });
  idHabito?: number;
  editando = false;
  carregando = false;
  enviando = false;
  mensagem = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0) { this.idHabito = id; this.editando = true; this.carregarHabito(id); }
  }

  salvar(): void {
    if (this.formulario.invalid) { this.formulario.markAllAsTouched(); this.mensagem = 'Corrija os campos destacados antes de salvar.'; return; }
    const habito: HabitoPayload = this.formulario.getRawValue();
    this.enviando = true;
    this.mensagem = '';
    if (this.editando && this.idHabito) {
      this.habitoService.atualizar(this.idHabito, habito).subscribe({ next: () => this.voltarComSucesso('Hábito atualizado com sucesso.'), error: (erro: Error) => this.tratarErro(erro) });
      return;
    }
    this.habitoService.cadastrar(habito).subscribe({ next: () => this.voltarComSucesso('Hábito cadastrado com sucesso.'), error: (erro: Error) => this.tratarErro(erro) });
  }

  private carregarHabito(id: number): void {
    this.carregando = true;
    this.habitoService.buscarPorId(id).subscribe({
      next: (habito) => { this.formulario.patchValue({ descricao: habito.descricao, metaDias: habito.metaDias }); this.carregando = false; },
      error: (erro: Error) => { this.carregando = false; this.mensagem = erro.message; }
    });
  }

  private voltarComSucesso(mensagem: string): void { this.router.navigate(['/'], { queryParams: { sucesso: mensagem } }); }
  private tratarErro(erro: Error): void { this.enviando = false; this.mensagem = erro.message; }
}
