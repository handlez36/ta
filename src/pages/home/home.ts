import { CategoryDataServiceProvider } from '../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from '../../providers/journey-data-service/journey-data-service';
import { CategoriesPage } from './../categories/categories';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
    private journeyDataService: JourneyDataServiceProvider)
  {
      // journeyDataService.getAll()
      //   .then( journies => {
      //     this.journies = JSON.parse(journies);

      //     if (this.journies.length > 0) {
      //       console.log("Setting featured journey");
      //       this.featuredJourney = this.journies[0];
      //     }
      //   });
      
      // categoryDataService.getAll()
      //   .then( categories => this.categories = JSON.parse(categories) );
  }

  search() {

  }

  toCategories() {
    // this.navCtrl.push( CategoriesPage )
    // this.navCtrl.push('JourneyListPage');
  }

}