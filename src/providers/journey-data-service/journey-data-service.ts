import { CategoryDataServiceProvider } from '../category-data-service/category-data-service';
import { Storage } from '@ionic/storage';
import { MocSqliteDataServiceProvider } from './../moc-sqlite-data-service/moc-sqlite-data-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Journey } from '../../models/journey';

/*
  Generated class for the JourneyDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JourneyDataServiceProvider extends MocSqliteDataServiceProvider {

  private urlSuffix;
  private myJournies: any[];
  private myHeaders;

  constructor(
    private myHttp: Http, 
    private st: Storage,
    private categoryService: CategoryDataServiceProvider) 
  {
    super(myHttp, st, "journies");
    
    this.setConfigurations();
    this.urlSuffix = "journies";
  }
  
  setConfigurations() {
    this.myHeaders = new Headers();
    this.myHeaders.append('Content-Type', 'application/json');
    // this.options = new RequestOptions({ headers: this.myHeaders });
  }

  geyMyJournies(userId, refreshFromServer: boolean = true) {
    if(refreshFromServer) {
      return this.geyMyJourniesFromServer(userId)
    }

    return (this.myJournies.length > 0) ?
      Observable.of(this.myJournies) :
      this.geyMyJourniesFromServer(userId)
  }

  geyMyJourniesFromServer(userId): Observable<any> {
    let params = new URLSearchParams();
    params.set('user_id', userId);

    this.options = new RequestOptions({ 
      headers: this.myHeaders,
      params: params
    });

    return this.http.get(this.url_prefix + this.urlSuffix + `?user_id=${userId}`)
      .map( data => data.json() )
  }

  save(myJournies) {
    this.myJournies = myJournies;
  }

}
