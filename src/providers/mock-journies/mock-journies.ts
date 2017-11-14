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
  categories = [];

  constructor() {
    super();

    this.initializeData();
  }

  // constructor(public categoriesProvider: MockCategoriesProvider) {
  //   super();

  //   this.categories = categoriesProvider.getAll();
  //   this.initializeData();
  // }

  initializeData() {
    for (let i=1; i<6; i++) {
      this.categories.push(
        { 
          id: i, 
          name: "Category " + i, 
          description: "Description of category " + i 
        }
      )
    }

    for( let i=1; i<11; i++) {
      this.items.push(
        {
          id: i,
          title: "Journey " + i,
          description: "Description for journey " + i,
          user: (i % 2 == 0) ? 'CamJam' : 'Devi Dev',
          last_updated: Date.now,
          category: this.categories[ Math.round(Math.random() * 5) ]
        }
      )
    }
  }

}
