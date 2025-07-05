import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HeroListComponent } from './heroes/pages/hero-list/hero-list';
import { HeroFormComponent } from './heroes/pages/hero-form/hero-form';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/add', component: HeroFormComponent },
  { path: 'heroes/edit/:id', component: HeroFormComponent },
];

export const APP_ROUTES = provideRouter(routes);
