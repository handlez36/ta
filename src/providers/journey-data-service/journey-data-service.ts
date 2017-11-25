import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { MocSqliteDataServiceProvider } from './../moc-sqlite-data-service/moc-sqlite-data-service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the JourneyDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JourneyDataServiceProvider extends MocSqliteDataServiceProvider {

  constructor(private h: Http, private st: Storage) {
    super(h, st, "journies");
  }

}
