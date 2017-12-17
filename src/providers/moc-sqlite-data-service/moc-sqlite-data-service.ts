import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from './../../models/category';
import { Journey } from './../../models/journey';
import { User } from './../../models/user';
import { Post } from './../../models/post';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';

/*
  Generated class for the MocSqliteDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MocSqliteDataServiceProvider {

  items = [];

  url_prefix;
  headers;
  options;
  store;
  adapter;
  auth0adapter;
  key = "test";

  constructor(protected http: Http) {
    this.setHttpConfigurations();
    this.addMappers();
  }

  setHttpConfigurations() {
    this.store = new DataStore({ dbg: true});
    this.adapter = new HttpAdapter({
      basePath: "http://localhost:3000/",
      err: function(args) {
        debugger;
        console.log("Error: ", args);
      },
      afterFindAll: function(mapper, query, opts, response) {
          
      }
    });

    this.store.registerAdapter('http', this.adapter, { default: true });
  }

  addMappers() {
    this.store.defineMapper( 'journey', Journey.mapperOptions(this.store) );
    this.store.defineMapper( 'category', Category.mapperOptions() );
    this.store.defineMapper( 'user', User.mapperOptions() );
    this.store.defineMapper( 'post', Post.mapperOptions() );
  }

  getAll(resource, query_params = {}, options = {}): Observable<any> {
    return Observable.fromPromise( this.store.findAll(resource, query_params, options) );
  }

  get(resource, id, options = {}): Observable<any> {
    return Observable.fromPromise( this.store.find(resource, id, options) );
  }

  getFromCache(resource, query_params = {}) : any[] {
    return this.store.getAll(resource, query_params);
  }

  add(resource, params): Observable<any> {
    return Observable.fromPromise( this.store.create(resource, params));
  }

  update(updatedItem): Observable<any> {
    return Observable.fromPromise( updatedItem.save() );
  }

  delete(removedItem) {
      return Observable.fromPromise( removedItem.destroy() );
  }

  save(data) {
    // Cache latest list
    this.items = data;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

}