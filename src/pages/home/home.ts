import { CategoryDataServiceProvider } from '../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from '../../providers/journey-data-service/journey-data-service';
import { CategoriesPage } from './../categories/categories';
import { Component } from '@angular/core';
import { NavController, Events} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  journies = [];
  categories = [];
  featuredJourney;

  constructor(
    public navCtrl: NavController,
    private categoryDataService: CategoryDataServiceProvider,
    private journeyDataService: JourneyDataServiceProvider,
    private events: Events)
  {
      journeyDataService.getAll()
        .then( journies => {
          if(journies) {
            this.journies = JSON.parse(journies);
            console.log("Journies", this.journies);
            this.featuredJourney = this.journies[0];
          }
        });
  }

  search() {

  }

  toCategories() {
    this.navCtrl.push( CategoriesPage )
  }

}
