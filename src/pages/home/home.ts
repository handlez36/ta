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

  constructor(public navCtrl: NavController, 
    private journeyService: MockJourniesProvider) {

      this.journies = journeyService.getAll();
      // this.categories = categoryService.getAll();
      this.myJourney = this.journies[2];
  }

  search() {

  }

  toCategories() {
    this.navCtrl.push( CategoriesPage )
  }

}
