import { Injectable } from '@angular/core';
import { WEATHER_ITEMS } from '../mock-data';
import { WeatherItem } from '../models/weather-item';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Private array: outside nobody can change it directly
  private items: WeatherItem[] = [...WEATHER_ITEMS];

  getAll(): WeatherItem[] {
    return [...this.items];
  }

  getById(id: number): WeatherItem | undefined {
    return this.items.find((item) => item.id === id);
  }

  deleteItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  filterItems(searchQuery: string, selectedCondition: string): WeatherItem[] {
    const query = searchQuery.toLowerCase().trim();

    return this.items.filter((item) => {
      const matchesText = item.title.toLowerCase().includes(query);
      const matchesCondition =
        selectedCondition === 'All' ||
        item.condition === selectedCondition;

      return matchesText && matchesCondition;
    });
  }
}