import { bootstrapApplication } from '@angular/platform-browser';
import { configuracaoAplicacao } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, configuracaoAplicacao)
  .catch(erro => console.error(erro));
