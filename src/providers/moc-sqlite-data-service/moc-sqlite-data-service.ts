import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from './../../models/category';
import { Journey } from './../../models/journey';
import { User } from './../../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import { Mapper, version, DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';
import { Schema } from 'js-data';

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

  constructor(protected http: Http, private storage: Storage) {
    this.setHttpConfigurations();
    this.addMappers();
  }

  setHttpConfigurations() {
    this.store = new DataStore();
    this.adapter = new HttpAdapter({
      basePath: "http://localhost:3000/"
    });

    this.auth0adapter = new HttpAdapter({
      basePath: "https://tag-along.auth0.com/api/v2/",
      beforeHTTP: function(config, opts) {
        config.headers || (config.headers = {});
        config.headers.authorization = `Bearer ${User.access_key()}`;

        return HttpAdapter.prototype.beforeHTTP.call(this, config, opts);
      }
    });

    this.store.registerAdapter('http', this.adapter, { default: true });
    this.store.registerAdapter('auth0', this.auth0adapter);
  }

  addMappers() {
    this.store.defineMapper( 'journey', Journey.mapperOptions(this.store) );
    this.store.defineMapper( 'category', Category.mapperOptions() );
    this.store.defineMapper( 'user', User.mapperOptions() );
  }

  getAll(resource, query_params = null, options = null, refreshFromServer: boolean = true) {
    if(refreshFromServer) {
      return Observable.fromPromise( this.store.findAll(resource, query_params, options) )
    } else {
      return ( this.store.get(resource) ) ?
        Observable.of(this.store.get(resource)) :
        Observable.fromPromise( this.store.findAll(resource, query_params, options) )
    }
  }

  add(resource, params): Observable<any> {
    return Observable.fromPromise(this.store.create(resource, JSON.stringify(params), { noValidate: true}));
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

  save(data) {
    // Cache latest list
    this.items = data;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

}