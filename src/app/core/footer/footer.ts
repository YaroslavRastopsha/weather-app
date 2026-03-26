import { Component } from '@angular/core';
import { AppInfo } from '../../shared/models/appInfo';

@Component({
  selector: 'weather-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  public footerConfig: AppInfo = {
    title: 'Weather App',
    year: new Date().getFullYear()
  };
}