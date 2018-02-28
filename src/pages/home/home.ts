import { CreateJourneyCategoryPage } from './../create-journey-category/create-journey-category';
import { PostOptionModalPage } from './../post-option-modal/post-option-modal';
import { JourneySetupStartPage } from '../journey-setup-start/journey-setup-start';
import { MyJourneyPage } from './../my-journey/my-journey';
import { CategoriesPage } from './../categories/categories';

import { MocSqliteDataServiceProvider } from '../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { UserProvider } from './../../providers/user/user';
import { AuthLockProvider } from './../../providers/auth-lock/auth-lock';

import { Component, NgZone } from '@angular/core';
import { NavController, App, ModalController } from 'ionic-angular';
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

  private authResult: any;
  private token: any;
  private profile: any;
  private backend_profile: any;

  constructor(
    public navCtrl: NavController,
    private dataService: MocSqliteDataServiceProvider,
    private zone: NgZone,
    private modalCtrl: ModalController,
    private authService: AuthLockProvider,
    private app: App)
  {
    this.token = null;
    this.profile = null;

    zone = new NgZone({ enableLongStackTrace: false });
  }

  ionViewDidLoad() {
    // Check if already logged in...
    if(this.authService.isAuthenticated()) {
      this.profile = this.authService.getCurrentUser();
      this.setBackendProfile(this.profile);
    }

    // Listen for login event...
    authLock.on("authenticated", (authResult) => {
      this.token = authResult.accessToken;
      this.authResult = authResult;

      authLock.getUserInfo(authResult.accessToken, (err, profile) => {
        this.zone.run( () => {       
          this.profile = profile;
          this.authService.storeUserCredentials(this.authResult, profile);

          this.setBackendProfile(this.profile);
        });
      });
    });
  }

  setBackendProfile(profile) {
    // Load user object from backend
    this.dataService.getAll('user', { email: profile.email, user_id: profile.sub }, {})
      .subscribe( users => this.backend_profile = users[0] )
  }
  
  setProfile(profile) {
    this.profile = profile;
  }

  search() {

  }

  gotoStartJourney() {
    this.app.getRootNav().setRoot( CreateJourneyCategoryPage );
  }

  gotoMyJournies() {
    this.app.getRootNav().setRoot( MyJourneyPage );
  }

  gotoPostModal(user) {
    let modal = this.modalCtrl.create( PostOptionModalPage, { user: user} );

    modal.present();

    modal.onDidDismiss( options => {
      // TODO: Dismiss quick add option
      // TODO: Navigate to post page with journey and post type options
    })
  }

  login() {
    // Show Auth0 login screen
    authLock.show();
  }

  logout() {
    // Nullify local storage's user credentials and logout
    this.authService.removeUserCredentials();

    authLock.logout({ 
      returnTo: 'http://localhost:8100/',
      clientID: '0nmSGCze0Amnz2HMdcxoDFH5VgIjsJtF'
    });
  }
}