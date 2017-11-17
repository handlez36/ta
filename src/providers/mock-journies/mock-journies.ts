import { User } from '../../models/user';
import { Category } from '../../models/category';
import { Journey } from '../../models/journey';
import { MockDataServiceProvider } from './../mock-data-service/mock-data-service';
import { MockCategoriesProvider } from './../mock-categories/mock-categories';
import { DataServiceProvider } from './../data-service/data-service';
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

    this.initializeData();
  }

  initializeData() {
    // Initialize users
    this.users[0] = new User(1, "user1");
    this.users[1] = new User(2, "user2");

    // Initialize categories
    for (let i=1; i<6; i++) {
      this.categories.push(new Category(i, `Category ${i}`, `Description of category ${i}`))
    }

    // Initialize journies
    for( let i=1; i<11; i++) {
      this.items.push(
        new Journey(i, (i%2==0) ? this.users[1] : this.users[0], this.categories[ Math.round(Math.random() * 5) ], `Journey ${i}`, `Description for journey ${i}`)
      )
    }
  }

}
