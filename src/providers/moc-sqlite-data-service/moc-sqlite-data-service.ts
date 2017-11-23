import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the MocSqliteDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MocSqliteDataServiceProvider {

  items = [];

  itemObserver;
  itemListObservable;
  promise;

  constructor(private storage: Storage, private key: string) {
    this.promise = storage.get(key);
    this.promise.then( items => {
      if (items) {
        this.items = JSON.parse(items);
      }
    });

    this.itemListObservable = Observable.create( observer => this.itemObserver = observer);
  }

  getAll() { 
    return this.promise;
    // return this.storage.get(this.key);
    // return this.items;
  }

  save(data): void {
    // TEMPORARY
    // This will need to be expanded to separate add, update, delete
    // methods when we have a backend setup

    let jsonedData = JSON.stringify(data);
    this.storage.set(this.key, jsonedData);
  }

  getUpdates(): Observable<any> {
    return this.itemListObservable;
  }

  add(newItem) {
    this.items.push(newItem);
    this.itemObserver.next(this.items);
  }

  update(index, updatedItem) {
      this.items.splice(index, 1, updatedItem);
      this.itemObserver.next(this.items);
  }

  delete(index) {
      this.items.splice(index,1);
      this.itemObserver.next(this.items);
  }

}