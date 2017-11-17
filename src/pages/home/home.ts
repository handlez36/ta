import { CategoriesPage } from './../categories/categories';
import { MockJourniesProvider } from '../../providers/mock-journies/mock-journies';
import { MockCategoriesProvider } from '../../providers/mock-categories/mock-categories';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  journies: any[];
  myJourney;
  // categories: any[];

  constructor(
    public navCtrl: NavController, 
    private journeyDataService: MockJourniesProvider)
  {
      this.journies = journeyDataService.getAll();
      this.myJourney = this.journies[3];

      console.log(this.myJourney);
  }

  search() {

  }

  toCategories() {
    this.navCtrl.push( CategoriesPage )
  }

}
