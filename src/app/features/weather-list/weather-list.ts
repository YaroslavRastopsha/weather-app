import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherCard } from '../../shared/components/weather-card/weather-card';
import { FilterOptions } from '../../shared/models/filter-options';
import { WeatherCondition, WeatherItem } from '../../shared/models/weather-item';
import { WeatherService } from '../../shared/services/weather.service';

@Component({
  selector: 'weather-list',
  imports: [WeatherCard, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './weather-list.html',
  styleUrl: './weather-list.css',
})
export class WeatherList implements OnInit {
  public searchQuery: string = '';
  public selectedCondition: string = 'All';

  public products$!: Observable<WeatherItem[]>;

  public conditionOptions: string[] = [
    'All',
    ...Object.values(WeatherCondition),
  ];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.products$ = this.weatherService.items$;
    this.weatherService.initItems();
  }

  handleCardAction(id: number): void {
    this.weatherService.deleteItem(id);
  }

  onFiltersChange(): void {
    const options: FilterOptions = {
      query: this.searchQuery,
      condition: this.selectedCondition,
    };

    this.weatherService.filterItems(options);
  }

  resetFilters(element: HTMLInputElement): void {
    this.searchQuery = '';
    this.selectedCondition = 'All';

    this.weatherService.filterItems({
      query: '',
      condition: 'All',
    });

    element.focus();
  }
}