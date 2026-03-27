import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherCondition, WeatherItem } from '../../models/weather-item';

@Component({
  selector: 'weather-card',
  imports: [CommonModule],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  @Input({ required: true }) item!: WeatherItem;

  @Output() cardAction = new EventEmitter<number>();

  public WeatherCondition = WeatherCondition;

  onBtnClick(): void {
    this.cardAction.emit(this.item.id);
  }
}