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
  featuredJourney;

  constructor(
    public navCtrl: NavController, 
    private journeyDataService: JourneyDataServiceProvider)
  {
      journeyDataService.getAll()
        .then( journies => {
          if(journies) {
            this.journies = journies;
            this.featuredJourney = this.journies[0];
          }
        })
  }

  search() {

  }

  toCategories() {
    this.navCtrl.push( CategoriesPage )
  }

}
