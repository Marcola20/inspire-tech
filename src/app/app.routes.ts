import { Routes } from '@angular/router';
import { ContactComponent } from './form-contato/form-contato.component';
import { FormVagasComponent } from './form-vagas/form-vagas.component';

export const routes: Routes = [
  { path: 'form-contato', component: ContactComponent },
  { path: 'form-vagas', component: FormVagasComponent},
  { path: '', redirectTo: '/form-contato', pathMatch: 'full' },  
  { path: '**', redirectTo: '/form-contato' },
];
