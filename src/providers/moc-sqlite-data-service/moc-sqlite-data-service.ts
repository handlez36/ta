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

  constructor(private storage: Storage, private key: string) { }

  getAll(): Promise<any> { 
    return this.storage.get(this.key);
  }

  save(data): void {
    let jsonedData = JSON.stringify(data);
    this.storage.set(this.key, jsonedData);
  }

}
