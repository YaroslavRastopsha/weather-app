export enum WeatherCondition {
  Sunny = 'Sunny',
  Cloudy = 'Cloudy',
  Rainy = 'Rainy',
  Stormy = 'Stormy',
  Snowy = 'Snowy',
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface LocationInfo {
  city: string;
  country: string;
  coordinates: Coordinates;
}

export interface WeatherDetails {
  humidity: number;
  windSpeed: number;
  pressure: number;
}

export interface WeatherItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  temperature: number;
  forecastDate: Date;
  condition: WeatherCondition;
  tags: string[];
  location: LocationInfo;
  details?: WeatherDetails; 
  isDiscount: boolean;
  quantity: number;
  isFeatured: boolean;
}