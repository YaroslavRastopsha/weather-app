import { CommonModule, DatePipe, DecimalPipe, Location, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherItem } from '../../shared/models/weather-item';
import { WeatherService } from '../../shared/services/weather.service';
import { StatusColorPipe } from '../../shared/pipes/status-color';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink, DatePipe, DecimalPipe, TitleCasePipe, StatusColorPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  @Input() id!: string;

  public product$!: Observable<WeatherItem | undefined>;

  constructor(
    private weatherService: WeatherService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.product$ = this.weatherService.getById(this.id);
  }

  goBack(): void {
    this.location.back();
  }
}