import { Component } from '@angular/core';
import { WeatherCard } from '../../shared/components/weather-card/weather-card';
import { WEATHER_ITEMS } from '../../shared/mock-data';
import { WeatherItem } from '../../shared/models/weather-item';

@Component({
  selector: 'weather-list',
  imports: [WeatherCard],
  templateUrl: './weather-list.html',
  styleUrl: './weather-list.css',
})
export class WeatherList {
  public items: WeatherItem[] = WEATHER_ITEMS;
}