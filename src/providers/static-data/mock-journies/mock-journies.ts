import { Storage } from '@ionic/storage';
import { User } from '../../../models/user';
import { Category } from '../../../models/category';
import { Journey } from '../../../models/journey';
import { MockDataServiceProvider } from './../mock-data-service/mock-data-service';
import { MockCategoriesProvider } from './../mock-categories/mock-categories';
import { DataServiceProvider } from './../../data-service/data-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MockJourniesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockJourniesProvider extends MockDataServiceProvider {
  
  items = [];
  users = [];
  categories = [];

  constructor() {
    super();

    console.log("About to iniatialize data");
    this.initializeData();
  }

  initializeData() {
    // Initialize users
    this.users[0] = new User(1, "camjam");
    this.users[1] = new User(2, "devi dev");

    // Initialize categories
    for (let i=1; i<6; i++) {
      this.categories.push(new Category(`Category ${i}`))
    }

    // Initialize journies
    for( let j=1; j<11; j++) {
      let randomCategoryIndex = Math.round( Math.random() * 4 );
      console.log("Random category index:: ", randomCategoryIndex);
      this.items.push(
        // new Journey(j, (j%2==0) ? this.users[1] : this.users[0], this.categories[randomCategoryIndex], `Journey ${j}`, `Description for journey ${j}`)
      )
    }
  }

}
