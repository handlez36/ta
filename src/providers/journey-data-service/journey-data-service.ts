import { MocSqliteDataServiceProvider } from './../moc-sqlite-data-service/moc-sqlite-data-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/fromPromise';
import { Headers, Http, RequestOptions } from '@angular/http';

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

  constructor(private myHttp: Http) 
  {
    super(myHttp);
    
    this.setCustomConfigurations();
    this.urlSuffix = "journies";
  }
  
  setCustomConfigurations() {
    // this.addMapper('journey', this.mapperOptions());

    this.myHeaders = new Headers();
    this.myHeaders.append('Content-Type', 'application/json');
  }

  geyMyJournies(userId, refreshFromServer: boolean = true) {
    console.log("Getting my journies");
    let jPromise: Promise<any> = this.store.findAll('journey', { user_id: userId});

    jPromise
      .then( journies => console.log("Journies from js-data: ", journies));

    return Observable.fromPromise(jPromise);
  }

  // Using Ionic http method...
  // geyMyJournies(userId, refreshFromServer: boolean = true) {
  //   if(refreshFromServer) {
  //     return this.geyMyJourniesFromServer(userId)
  //   }

  //   return (this.myJournies.length > 0) ?
  //     Observable.of(this.myJournies) :
  //     this.geyMyJourniesFromServer(userId)
  // }

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

  mapperOptions() {
    return {
      endpoint: 'journies',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          description: { type: 'string' }
        },
        relations: {
          belongsTo: {
            category: {
              foreignKey: 'category_id',
              localField: 'category'
            }
          }
        }
      }
    }
  }

  save(myJournies) {
    this.myJournies = myJournies;
  }

}
