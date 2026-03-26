import { Component } from '@angular/core';
import { AppInfo } from '../../shared/models/appInfo';

@Component({
  selector: 'weather-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public headerConfig: AppInfo = {
    title: 'Weather App',
    year: 2026
  };
}