import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map } from 'rxjs/operators';
import { WEATHER_ITEMS } from '../mock-data';
import { FilterOptions } from '../models/filter-options';
import { WeatherItem } from '../models/weather-item';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Full source data
  private allItems: WeatherItem[] = [...WEATHER_ITEMS];

  // Main state stream for UI
  private itemsSubject$ = new BehaviorSubject<WeatherItem[]>([]);
  public items$ = this.itemsSubject$.asObservable();

  // Filter state
  private filterSubject$ = new BehaviorSubject<FilterOptions>({
    query: '',
    condition: 'All',
  });

  constructor() {
    this.filterSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        map((options) => {
          const query = options.query.toLowerCase().trim();

          return this.allItems.filter((item) => {
            const matchesQuery = item.title.toLowerCase().includes(query);
            const matchesCondition =
              options.condition === 'All' ||
              item.condition === options.condition;

            return matchesQuery && matchesCondition;
          });
        })
      )
      .subscribe((filteredItems) => {
        this.itemsSubject$.next(filteredItems);
      });
  }

  getAll(): Observable<WeatherItem[]> {
    return of([...this.allItems]).pipe(delay(1000));
  }

  initItems(): void {
    this.getAll().subscribe((items) => {
      this.allItems = items;
      this.itemsSubject$.next(items);
    });
  }

  getById(id: number | string): Observable<WeatherItem | undefined> {
    const numericId = Number(id);
    const item = this.allItems.find((item) => item.id === numericId);
    return of(item).pipe(delay(1000));
  }

  deleteItem(id: number): void {
    this.allItems = this.allItems.filter((item) => item.id !== id);

    const currentFilter = this.filterSubject$.value;
    const query = currentFilter.query.toLowerCase().trim();

    const filteredItems = this.allItems.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query);
      const matchesCondition =
        currentFilter.condition === 'All' ||
        item.condition === currentFilter.condition;

      return matchesQuery && matchesCondition;
    });

    this.itemsSubject$.next(filteredItems);
  }

  filterItems(options: FilterOptions): void {
    this.filterSubject$.next(options);
  }
}