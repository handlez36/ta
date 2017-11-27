import { Journey } from './../../models/journey';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
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
  categories = [];
  journeyListener;

  constructor(
    private journeyDataService: JourneyDataServiceProvider,
    private categoryDataService: CategoryDataServiceProvider) { }

  ngOnInit() {
    this.categoryDataService.getAll()
      .subscribe( categories => {
        if(categories)
          this.categories = categories 
          // this.categories = Category.createBulkCategories(categories);
      });
    
    this.journeyDataService.getAll()
      .subscribe( journies => {
        if(journies)
          this.journies = Journey.createBulkJournies(journies) 
      });
  }

  getCategoryName(category_id) {
    // console.log(this.categories);
    // console.log(this.categories.find( cat => cat.id === category_id ).name);

    // return "Test";
    let category = this.categories.find( cat => cat.id === category_id );
    return category ? category.name : "??";
  }

}
