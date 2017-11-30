import { AuthLockProvider } from './../../providers/auth-lock/auth-lock';
import { CategoryDataServiceProvider } from '../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from '../../providers/journey-data-service/journey-data-service';
import { CategoriesPage } from './../categories/categories';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import Auth0Lock from '@auth0/cordova';
import Auth0Lock from 'auth0-lock';

var options = {
  oidcConformant: true,
  auth: {
    params: {
      scope: 'openid email profile user_metadata app_metadata'
    },
    audience: 'https://tag-along.auth0.com/userinfo',
  }
}

// Initializing our Auth0Lock
const authLock = new Auth0Lock(
  '0nmSGCze0Amnz2HMdcxoDFH5VgIjsJtF',
  'tag-along.auth0.com',
  options
);

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  journies = [];
  categories = [];
  featuredJourney;

  authResult;
  token;
  profile;
  test;

  constructor(
    public navCtrl: NavController,
    private categoryDataService: CategoryDataServiceProvider,
    private journeyDataService: JourneyDataServiceProvider,
    private authService: AuthLockProvider)
  {
    this.token = null;
    this.profile = null;
    this.test = "Brandon";
  }

  ionViewDidLoad() {
    authLock.on("authenticated", (authResult) => {
      this.token = authResult.accessToken;
      this.authResult = authResult;
      authLock.getUserInfo(authResult.accessToken, this.getUserInfo.bind(this));
      // authLock.getUserInfo(authResult.accessToken, this.getUserInfo.bind(this)));
    });
  }

  getUserInfo(err, profile) {
    if(err) { console.log("Error: ", err) }
    
    this.profile = profile;
    this.authService.storeUserCredentials(this.authResult, profile);

    // if(err) { console.log("Error: ", err) }
    
    // // this.profile = profile;
    // this.setProfile(profile);
    // this.authService.storeUserCredentials(this.token, profile);
  }

  testButton() {
    // console.log("Profile is: ", this.profile);
  }

  setProfile(profile) {
    this.profile = profile;
  }

  search() {

  }

  toCategories() {
  }

  login() {
    authLock.show();
  }

  logout() {
    this.authService.storeUserCredentials(null, null);

    authLock.logout();
  }



}