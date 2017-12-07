import { Journey } from './../../models/journey';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

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

  @Input() featuredJourney;
  @Input() featuredUser;

  journey;
  categories = []

  constructor(
    private journiesDataService: JourneyDataServiceProvider,
    private categoryDataService: CategoryDataServiceProvider
  ) 
  {
    this.categoryDataService.getAll()
      .subscribe( categories => {
        if(categories)
          this.categories = categories;
      })

    this.journey = this.featuredJourney;
    console.log("Featured Journey : constructor");

    // this.journiesDataService.getAll()
    //   .subscribe( journies => {
    //     if(journies && journies.length > 0)
    //       this.journey = Journey.createSingleJourney(journies[0]);
    //   });
  }

  ngOnInit() {
    this.journey = this.featuredJourney;
  }

}
