import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component } from '@angular/core';

/**
 * Generated class for the FeaturedJourneyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'featured-journey',
  templateUrl: 'featured-journey.html'
})
export class FeaturedJourneyComponent {

  journey;

  constructor(private journies: JourneyDataServiceProvider) {
    this.journies.getAll()
      .then( journies => {
        if(journies) {
          this.journey = journies[0];
        }
      })
    
  }

}
