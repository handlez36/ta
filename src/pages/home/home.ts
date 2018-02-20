import { PostOptionModalPage } from './../post-option-modal/post-option-modal';
import { MyJourneyPage } from './../my-journey/my-journey';
// import { Journey } from './../../models/journey';
// import { User } from './../../models/user';
import { UserProvider } from './../../providers/user/user';
import { AuthLockProvider } from './../../providers/auth-lock/auth-lock';
import { CategoriesPage } from './../categories/categories';
import { Component, NgZone } from '@angular/core';
import { NavController, App, ModalController } from 'ionic-angular';

import Auth0Lock from 'auth0-lock';
import { JourneySetupStartPage } from '../journey-setup-start/journey-setup-start';
import { MocSqliteDataServiceProvider } from '../../providers/moc-sqlite-data-service/moc-sqlite-data-service';

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

  latestJournies = null;
  categories = [];
  users = [];
  myJournies = [];
  featuredJourney = null;
  myFeaturedJourney = null;
  loadedFlag;

  authResult;
  token;
  profile;
  test;

  private backend_profile: any;

  constructor(
    public navCtrl: NavController,
    private dataService: MocSqliteDataServiceProvider,
    private zone: NgZone,
    private modalCtrl: ModalController,
    private authService: AuthLockProvider,
    private userService: UserProvider,
    private app: App)
  {
    this.token = null;
    this.profile = null;

    zone = new NgZone({ enableLongStackTrace: false });

    this.loadedFlag = false;

    // Temporarily putting this here to clear out localStorage's user credentials when
    // starting the application. This will be handled by signing out of the application.
    // this.authService.removeUserCredentials();

  }

  ionViewDidLoad() {


    // Check if already logged in...
    if(this.authService.isAuthenticated()) {
      this.profile = this.authService.getCurrentUser();
      this.setBackendProfile(this.profile);
    }

    // Get latest 25 journies...
    // this.journeyDataService.getAll()
    //   .subscribe( journies => {
    //     if(journies && journies.length > 0) {
    //       // Pass this to the 'journey-list' component...
    //       // this.latestJournies = journies.map( journey => Journey.createSingleJourney(journey));

    //       this.zone.run( () => { 
    //         this.latestJournies = journies.map( journey => Journey.createSingleJourney(journey));
    //         this.featuredJourney = this.latestJournies[1];
    //       })
    //     }
    //   });

    // PUT BACK
    // // Listen for login event...
    // authLock.on("authenticated", (authResult) => {
    //   this.token = authResult.accessToken;
    //   this.authResult = authResult;

    //   authLock.getUserInfo(authResult.accessToken, (err, profile) => {
    //     this.zone.run( () => {
    //       if(err) { console.log("Error: ", err) }
          
    //       this.profile = profile;
    //       this.authService.storeUserCredentials(this.authResult, profile);

    //       this.setBackendProfile(this.profile);
    //     });
    //   });
    // });

    // this.getCurrentUserJournies();

    // Pull all users
    // TODO: Only pull users for the current journey list
    // COMMENTED ON 2/20/2018

    // this.userService.getAll()
    //   .subscribe(users => {
    //     if(users) {
    //       users.forEach( user => {
    //         this.users.push( new User(user.user_id, user.email, user.picture) )
    //         this.userService.save(this.users);
    //       });
    //     }
    //   })
  }

  // getCurrentUserJournies() {
  //   if(this.profile) {
  //     this.journeyDataService.geyMyJournies(this.profile.sub)
  //       .subscribe( journies => {
  //         this.loadedFlag = true;

  //         if(journies && journies.length > 0) {
  //           this.myJournies = journies.map( journey => Journey.createSingleJourney(journey));

  //           this.zone.run( () => { 
  //             this.loadedFlag = true;
  //             this.myFeaturedJourney = this.myJournies[0]; 
  //           })
  //         }
  //       });
  //   } else { 
  //     this.loadedFlag = true 
  //   }
  // }

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

  toCategories() {
  }

  gotoStartJourney() {
    this.app.getRootNav().setRoot( JourneySetupStartPage );
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

  // PUT BACK
  login() {
    // Show Auth0 login screen
    authLock.show();
  }

// PUT BACK  
  logout() {
    // Nullify local storage's user credentials and logout
    this.authService.removeUserCredentials();

    authLock.logout({ 
      returnTo: 'http://localhost:8100/',
      clientID: '0nmSGCze0Amnz2HMdcxoDFH5VgIjsJtF'
    });
  }
}