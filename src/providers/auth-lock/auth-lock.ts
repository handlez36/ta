import { Injectable } from '@angular/core';
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

  constructor() {
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

  public removeUserCredentials() {
    this.storeUserCredentials(null, null);
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

  public getCurrentUser() {
    if (this.isAuthenticated()) {
      return this.userProfile;
    } else {
      return null;
    }
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expiration'));

    if(expiresAt && this.userProfile) {
      return Date.now() < expiresAt && this.userProfile && this.accessToken;
    } else {
      return false;
    }
  }

}
