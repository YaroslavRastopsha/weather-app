import { Pipe, PipeTransform } from '@angular/core';
import { WeatherCondition } from '../models/weather-item';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(condition: WeatherCondition | null | undefined): string {
    switch (condition) {
      case WeatherCondition.Sunny:
        return '#f59e0b';

      case WeatherCondition.Cloudy:
        return '#6b7280';

      case WeatherCondition.Rainy:
        return '#3b82f6';

      case WeatherCondition.Stormy:
        return '#7c3aed';

      case WeatherCondition.Snowy:
        return '#0ea5e9';

      default:
        return '#9ca3af';
    }
  }
}