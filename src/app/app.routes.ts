import { Routes } from '@angular/router';
import { WeatherList } from './features/weather-list/weather-list';
import { ProductDetails } from './features/product-details/product-details';
import { ProductForm } from './features/product-form/product-form';
import { NotFound } from './core/pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: WeatherList,
  },
  {
    path: 'product/new',
    component: ProductForm,
  },
  {
    path: 'product/:id',
    component: ProductDetails,
  },
  {
    path: '**',
    component: NotFound,
  },
];