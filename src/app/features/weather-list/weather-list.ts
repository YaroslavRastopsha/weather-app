import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherCard } from '../../shared/components/weather-card/weather-card';
import { WeatherCondition, WeatherItem } from '../../shared/models/weather-item';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'weather-list',
  imports: [WeatherCard, FormsModule],
  templateUrl: './weather-list.html',
  styleUrl: './weather-list.css',
})
export class WeatherList implements OnInit {
  public searchQuery: string = '';
  public selectedCondition: string = 'All';

  public filteredProducts: WeatherItem[] = [];

  public conditionOptions: string[] = [
    'All',
    ...Object.values(WeatherCondition),
  ];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.filteredProducts = this.weatherService.filterItems(
      this.searchQuery,
      this.selectedCondition
    );
  }

  handleCardAction(id: number): void {
    this.weatherService.deleteItem(id);
    this.loadItems();
  }

  onFiltersChange(): void {
    this.loadItems();
  }

  resetFilters(element: HTMLInputElement): void {
    this.searchQuery = '';
    this.selectedCondition = 'All';
    this.loadItems();
    element.focus();
  }
}