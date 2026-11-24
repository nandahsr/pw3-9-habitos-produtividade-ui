import { Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const rotas: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'novo', component: FormularioComponent },
  { path: 'editar/:id', component: FormularioComponent },
  { path: '**', redirectTo: '' }
];
