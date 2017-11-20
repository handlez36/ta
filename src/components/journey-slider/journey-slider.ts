import { MockJourniesProvider } from './../../providers/mock-journies/mock-journies';
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
  journies;

  constructor(private journeyService: MockJourniesProvider) {
    console.log("In constructor of journey-slider");
  }

  ngOnInit() {
    console.log("In ionViewDidLoad method of journey-slider");

    this.journies = this.journeyService.getAll();
    
    console.log("Journies: ", this.journies);
  }

}
