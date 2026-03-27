import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WeatherItem } from '../../models/weather-item';

@Component({
  selector: 'weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  @Input({ required: true }) item!: WeatherItem;
}