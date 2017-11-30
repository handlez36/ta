import { Auth0 } from 'auth0-js';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthLockProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthLockProvider {

  userProfile: any;
  accessToken: string;
  expiration;

  constructor(private storage: Storage) {
    this.userProfile = this.getStorageVariable('userProfile');
    this.accessToken = this.getStorageVariable('accessToken');    
  }

  public storeUserCredentials(authResults?, authProfile?) {
    let profile = authProfile || null;
    let token = authResults ? authResults.accessToken : null;
    let expiresAt = (authResults) ?
      (authResults.expiresIn * 1000) + new Date().getTime() :
      null;

    this.setProfile(profile);
    this.setAccessToken(token);
    this.setExpiration(expiresAt)
  }

  private getStorageVariable(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  private setProfile(profile) {
    this.userProfile = profile;
    this.setStorageVariable('userProfile', profile);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable('accessToken', token);
  }

  private setExpiration(expiration) {
    this.expiration = expiration;
    this.setStorageVariable('expiration', expiration);
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt && this.userProfile && this.accessToken;
  }

}
