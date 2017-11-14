import { DataServiceProvider } from './../data-service/data-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MockDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MockDataServiceProvider implements DataServiceProvider {

  public items: any[];

  constructor() { }

  getAll() { 
    return this.items;
  }

  create(newItem) { 
    this.items.push( newItem );

    return this.items;
  }

  update(updatedItem) {
    let originalIndex = updatedItem.id - 1;

    this.items.splice(originalIndex, 1, updatedItem);

    return true;
  }

  delete(id) { 
    this.items.splice(id-1, 1);

    return true;
  }

}
