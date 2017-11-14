import { MockDataServiceProvider } from './../mock-data-service/mock-data-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MockCategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockCategoriesProvider extends MockDataServiceProvider {

  items = [];

  constructor() {
    super();
    
    this.initializeData();
  }

  initializeData() {
    for (let i=1; i<6; i++) {
      this.items.push(
        { 
          id: i, 
          name: "Category " + i, 
          description: "Description of category " + i 
        }
      )
    }
  }

}
