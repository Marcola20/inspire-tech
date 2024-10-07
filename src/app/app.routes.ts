import { Routes } from '@angular/router';
import { ContactComponent } from './form-contato/form-contato.component';
import { FormVagasComponent } from './form-vagas/form-vagas.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: 'home-page', component: HomePageComponent},
  { path: 'form-contato', component: ContactComponent },
  { path: 'form-vagas', component: FormVagasComponent},
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },  
  { path: '**', redirectTo: '/page' },
];
