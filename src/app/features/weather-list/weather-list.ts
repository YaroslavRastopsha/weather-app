import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherCard } from '../../shared/components/weather-card/weather-card';
import { WEATHER_ITEMS } from '../../shared/mock-data';
import { WeatherCondition, WeatherItem } from '../../shared/models/weather-item';

@Component({
  selector: 'weather-list',
  imports: [WeatherCard, FormsModule],
  templateUrl: './weather-list.html',
  styleUrl: './weather-list.css',
})
export class WeatherList {
  public searchQuery: string = '';
  public selectedCondition: string = 'All';

  public allProducts: WeatherItem[] = WEATHER_ITEMS;
  public filteredProducts: WeatherItem[] = WEATHER_ITEMS;

  public conditionOptions: string[] = [
    'All',
    ...Object.values(WeatherCondition),
  ];

  handleCardAction(id: number): void {
    console.log(`Користувач натиснув кнопку на товарі з ID: ${id}`);
  }

  filterItems(): void {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredProducts = this.allProducts.filter((item) => {
      const matchesText = item.title.toLowerCase().includes(query);
      const matchesCondition =
        this.selectedCondition === 'All' ||
        item.condition === this.selectedCondition;

      return matchesText && matchesCondition;
    });
  }

  resetFilters(element: HTMLInputElement): void {
    this.searchQuery = '';
    this.selectedCondition = 'All';
    this.filterItems();
    element.focus();
  }
}