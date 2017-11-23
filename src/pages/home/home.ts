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
      //   .then( journies => this.journies = JSON.parse(journies) );
      
      // categoryDataService.getAll()
      //   .then( categories => this.categories = JSON.parse(categories) );


      // if (this.journies.length > 0) {
      //   this.featuredJourney = this.journies[0];
      // }
  }

  ionViewDidLoad() {
    this.journeyDataService.getAll()
    .then( journies => {
      this.journies = JSON.parse(journies)
      console.log("Journies after load:", this.journies);
    });
  
    this.categoryDataService.getAll()
      .then( categories => this.categories = JSON.parse(categories) );


    if (this.journies.length > 0) {
      this.featuredJourney = this.journies[0];
    }
    console.log("View Loaded");
    console.log("Journies",this.journies);
  }

  search() {

  }

  toCategories() {
    // this.navCtrl.push( CategoriesPage )
    // this.navCtrl.push('JourneyListPage');
  }

}