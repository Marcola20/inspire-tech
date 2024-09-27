import { Routes } from '@angular/router';
import { ContactComponent } from './form-contato/form-contato.component';

export const routes: Routes = [
  { path: 'form-contato', component: ContactComponent },
  { path: '', redirectTo: '/form-contato', pathMatch: 'full' },  
  { path: '**', redirectTo: '/form-contato' } 
];
