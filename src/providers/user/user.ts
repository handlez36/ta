import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  url_prefix;
  headers;
  options;
  access_token;
  users;
  currentUser;

  constructor(public http: Http) {
    this.setHttpConfigurations();
  }

  setHttpConfigurations() {
    this.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VSXhSVEUzT0VNME5VRTRNRGswUlRJeVFqSTRNME0wTWtReFFqTkNRakZCT0RFeVFUQkJNQSJ9.eyJpc3MiOiJodHRwczovL3RhZy1hbG9uZy5hdXRoMC5jb20vIiwic3ViIjoibktyekJ3dHpzWTA3SjllcVlobWV1WGdIaFhPY2txMnRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdGFnLWFsb25nLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTE4MTk1OTQ3LCJleHAiOjE1MTgyODIzNDcsImF6cCI6Im5LcnpCd3R6c1kwN0o5ZXFZaG1ldVhnSGhYT2NrcTJ0Iiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.vMor6vJtU2jvZ7Ar83zIzmAD3dHuSDWUAx2SSLmLqifZadNjFk8M9KUWJ51f9u4DVkYItUdLAVJhOiIBNGzVimZr8ezOL7FGue0urrb2NAHaxjMF3PcVEqCuWH-UAb0m-gm3prGtYDSU6Cl0vI_vyHpPnlNp3qyfRU4HrnZeHEq0lGuQZ9s_wElC6KAUfheZMQR_L7LptKj-4Wsu3Egt0w1fk4q3wC-IFwOxOU8fZ6jXzpBSp1Tku9U458jl1KaafmkROTCggSIXr8ocpurYWGja-BodGDgilePvJsyMzMbDe8j6ce10HjE7eu1yOcU49UVJA1JnlLEPgwnqyTxrjw";
    this.url_prefix = "https://tag-along.auth0.com/api/v2/users"
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', `Bearer ${this.access_token}`);
    this.options = new RequestOptions({headers: this.headers});
  }

  getAll(params = null, refreshFromServer = true) {
    if(refreshFromServer)
      return this.getUsersFromServer(params);
    
    return (this.users.length > 0) ?
      Observable.of(this.users) :
      this.getUsersFromServer(params)
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUsersFromServer(params = null): Observable<any> {
    let queryStringParams = "";

    if(params) { queryStringParams = this.formUrl(queryStringParams, params) }

    return this.http.get(this.url_prefix + queryStringParams, this.options)
      .map( data => data.json() );
  }

  saveCurrentUser(user) {
    if(user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }

  save(users) {
    if(users) {
      this.users = users;
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  private formUrl(queryStringParams, params) {
    if(params) {
      queryStringParams += "?q=";
      Object.keys(params).forEach( (key,index) => {
        if (index > 0) { queryStringParams += " AND " }
        
        queryStringParams += `${key}:(`;
        params[key].forEach( (p,pIndex) => {
          if (pIndex > 0) { queryStringParams += " OR " }
          
          queryStringParams += `"${p}"`
        });
        queryStringParams += ")"
      });
    }

    return queryStringParams;
  }

}
