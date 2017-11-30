import { AuthLockProvider } from './../../providers/auth-lock/auth-lock';
import { CategoryDataServiceProvider } from '../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from '../../providers/journey-data-service/journey-data-service';
import { CategoriesPage } from './../categories/categories';
import { Component, NgZone } from '@angular/core';
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
    private zone: NgZone,
    private authService: AuthLockProvider)
  {
    this.token = null;
    this.profile = null;

    zone = new NgZone({ enableLongStackTrace: false });
  }

  ionViewDidLoad() {
    // Listen for login event...
    authLock.on("authenticated", (authResult) => {
      this.token = authResult.accessToken;
      this.authResult = authResult;

      authLock.getUserInfo(authResult.accessToken, (err, profile) => {
        this.zone.run( () => {
          if(err) { console.log("Error: ", err) }
          
          this.profile = profile;
          this.authService.storeUserCredentials(this.authResult, profile);
        });
      });
    });
  }

  setProfile(profile) {
    this.profile = profile;
  }

  search() {

  }

  toCategories() {
  }

  login() {
    // Show Auth0 login screen
    authLock.show();
  }

  logout() {
    // Nullify local storage's user credentials and logout
    this.authService.storeUserCredentials(null, null);

    authLock.logout({ 
      returnTo: 'http://localhost:8100/',
      clientID: '0nmSGCze0Amnz2HMdcxoDFH5VgIjsJtF'
    });
  }



}