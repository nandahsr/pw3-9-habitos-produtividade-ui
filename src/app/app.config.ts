import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { rotas } from './app.routes';

export const configuracaoAplicacao: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(rotas)]
};
