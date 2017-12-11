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
    this.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VSXhSVEUzT0VNME5VRTRNRGswUlRJeVFqSTRNME0wTWtReFFqTkNRakZCT0RFeVFUQkJNQSJ9.eyJpc3MiOiJodHRwczovL3RhZy1hbG9uZy5hdXRoMC5jb20vIiwic3ViIjoibktyekJ3dHpzWTA3SjllcVlobWV1WGdIaFhPY2txMnRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdGFnLWFsb25nLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTEzMDE2Mzc3LCJleHAiOjE1MTMxMDI3NzcsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Z9t_VbkEn9gGNYlL8sMsH3S-DDMIjwQ5WFjxkKGkx6cBp3rNIpuBmfivkK8vJpt7xhre6dnIDG-pbUOy8zU1vc8BhP92-CAnJLKpALTGPuIKjseplu0lbLsXoKIF8JxXdVIUnizgjb1N_m9CrXLpxhJGtzOBtLYP3JJbkiP1Bqs6I_TRM4rEeb0XhyeXpDC_LQaPBufOKM8DGa17FNHXrPnmHO5xHWee2Nfokj3AfmkeUdXgZSsToY42BUxRd2Sq-UsY_37S9-kwoOgp8BnNHtvGiUep_CYUMx46ufOTQiIwvpIzsBOtABNC9HhxsontoKD67-Pbn8HNRNaZTGdW6w";
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
