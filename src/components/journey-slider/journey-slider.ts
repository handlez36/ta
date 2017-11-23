import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Observable } from 'rxjs/Observable'; 
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
  journeyListener;

  constructor(private journeyService: JourneyDataServiceProvider) { }

  ngOnInit() {
    this.journies = this.journeyService.getAll()
    this.journeyListener = this.journeyService.getUpdates()
      .subscribe( updatedJournies => this.journies = updatedJournies );
  }

}
