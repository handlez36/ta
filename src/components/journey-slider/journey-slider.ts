import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component } from '@angular/core';

/**
 * Generated class for the JourneySliderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'journey-slider',
  templateUrl: 'journey-slider.html'
})
export class JourneySliderComponent {

  text: string;
  journies = [];

  constructor(private journeyService: JourneyDataServiceProvider) { }

  ngOnInit() {
    this.journeyService.getAll()
      .then( journies => {
        if (journies) { 
          this.journies = JSON.parse(journies);
        }
      });
  }

}
