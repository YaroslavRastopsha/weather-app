import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WeatherCondition, WeatherItem } from '../../models/weather-item';
import { TruncatePipe } from '../../pipes/truncate';
import { StatusColorPipe } from '../../pipes/status-color';
import { HighlightDirective } from '../../directives/highlight';

@Component({
  selector: 'weather-card',
  imports: [
    DatePipe,
    DecimalPipe,
    TitleCasePipe,
    RouterLink,
    TruncatePipe,
    StatusColorPipe,
    HighlightDirective,
  ],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  @Input({ required: true }) item!: WeatherItem;
  @Output() cardAction = new EventEmitter<number>();

  protected readonly WeatherCondition = WeatherCondition;

  onBtnClick(): void {
    this.cardAction.emit(this.item.id);
  }
}