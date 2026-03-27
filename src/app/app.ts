import { Component } from '@angular/core';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { WeatherList } from './features/weather-list/weather-list';

@Component({
  selector: 'weather-root',
  imports: [Header, Footer, WeatherList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}