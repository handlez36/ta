import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

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
  url_prefix;
  headers;
  options;

  constructor(private http: Http, private storage: Storage, private key: string) {
    this.setHttpConfigurations();

    // Maintain an in memory list
    // this.getAll()
    //   .subscribe( data => this.items = data )
  }

  setHttpConfigurations() {
    this.url_prefix = "http://localhost:3000/"
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions({headers: this.headers});
  }

  getAll(refreshFromServer: boolean = false) {
    if(refreshFromServer) {
      return this.getAllFromServer()
    }

    return (this.items.length > 0) ?
      Observable.of(this.items) :
      this.getAllFromServer()
  }

  getAllFromServer(): Observable<any> {
    return this.http.get(this.url_prefix + this.key)
      .map( data => data.json() )
  }

  getUpdates(): Observable<any> {
    return this.itemListObservable;
  }

  add(newItem): Observable<any> {
    let params = newItem.parameterize();

    return this.http.post(this.url_prefix + this.key, JSON.stringify(params), this.options)
      .map( data => data.json() );
  }

  update(index, updatedItem): Observable<any> {
      let updatedParams = updatedItem.parameterize();

      return this.http.put(
        this.url_prefix + this.key + "/" + updatedItem.id, 
        JSON.stringify(updatedParams), 
        this.options
      )
        .map( data => data.json() );
  }

  delete(index, removedItem) {
      return this.http.delete(
        this.url_prefix + this.key + "/" + removedItem.id,
        this.options)
          .map( data => data.json() );
  }

  save(data): Promise<any> {
    // TEMPORARY
    // This will need to be expanded to separate add, update, delete
    // methods when we have a backend setup

    let jsonedData = JSON.stringify(data);
    return this.storage.set(this.key, jsonedData);
  }

}