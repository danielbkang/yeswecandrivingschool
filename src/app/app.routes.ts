import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';

export const routes: Routes = [
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'pricing', component: PricingComponent, title: 'Pricing' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];
