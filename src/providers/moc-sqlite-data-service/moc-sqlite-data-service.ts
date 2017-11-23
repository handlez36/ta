import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MocSqliteDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MocSqliteDataServiceProvider {

  items = [];

  constructor(private storage: Storage, private key: string) {
    storage.get(key)
      .then( items => {
        if (items) {
          this.items = items;
        }
      })
  }

  getAll(): Promise<any> { 
    return this.storage.get(this.key);
  }

  save(data): void {
    // TEMPORARY
    // This will need to be expanded to separate add, update, delete
    // methods when we have a backend setup

    let jsonedData = JSON.stringify(data);
    this.storage.set(this.key, jsonedData);
  }

}
