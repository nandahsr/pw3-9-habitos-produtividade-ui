import { Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const rotas: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'habitos/novo', component: FormularioComponent },
  { path: 'habitos/editar/:id', component: FormularioComponent }
];
