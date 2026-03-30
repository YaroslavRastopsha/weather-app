import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WeatherCondition, WeatherItem } from '../../shared/models/weather-item';
import { WeatherService } from '../../shared/services/weather.service';
import { forbiddenNameValidator } from '../../shared/validators/custom.validators';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  public readonly conditionOptions = Object.values(WeatherCondition);

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          forbiddenNameValidator(/bad|test|admin/i),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      temperature: [
        0,
        [Validators.required, Validators.min(-50), Validators.max(60)],
      ],
      forecastDate: ['', [Validators.required]],
      condition: [WeatherCondition.Sunny, [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
      lat: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
      lon: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
      humidity: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      windSpeed: [0, [Validators.required, Validators.min(0)]],
      pressure: [1000, [Validators.required, Validators.min(800)]],
      quantity: [1, [Validators.required, Validators.min(0)]],
    });
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get temperature() {
    return this.form.get('temperature');
  }

  get forecastDate() {
    return this.form.get('forecastDate');
  }

  get condition() {
    return this.form.get('condition');
  }

  get city() {
    return this.form.get('city');
  }

  get country() {
    return this.form.get('country');
  }

  get lat() {
    return this.form.get('lat');
  }

  get lon() {
    return this.form.get('lon');
  }

  get humidity() {
    return this.form.get('humidity');
  }

  get windSpeed() {
    return this.form.get('windSpeed');
  }

  get pressure() {
    return this.form.get('pressure');
  }

  get quantity() {
    return this.form.get('quantity');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const newItem: WeatherItem = {
      id: Date.now(),
      title: value.title ?? '',
      description: value.description ?? '',
      imageUrl: value.imageUrl ?? '',
      temperature: Number(value.temperature),
      forecastDate: new Date(value.forecastDate ?? new Date()),
      condition: value.condition ?? WeatherCondition.Sunny,
      tags: ['new', 'user added'],
      location: {
        city: value.city ?? '',
        country: value.country ?? '',
        coordinates: {
          lat: Number(value.lat),
          lon: Number(value.lon),
        },
      },
      details: {
        humidity: Number(value.humidity),
        windSpeed: Number(value.windSpeed),
        pressure: Number(value.pressure),
      },
      isDiscount: false,
      quantity: Number(value.quantity),
      isFeatured: false,
    };

    this.weatherService.addItem(newItem);
    this.router.navigate(['/products']);
  }
}