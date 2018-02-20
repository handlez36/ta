import { MyJourneyPage } from './../../pages/my-journey/my-journey';
import { BaseCategoryPage } from './../../pages/base-category/base-category';
import { HomePage } from './../../pages/home/home';
import { App, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { AuthLockProvider } from '../../providers/auth-lock/auth-lock';

/**
 * Generated class for the FooterMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-menu',
  templateUrl: 'footer-menu.html'
})
export class FooterMenuComponent {

  private text: string;

  constructor(
    private navCtrl: NavController, 
    private app: App,
    private authService: AuthLockProvider) 
  { 

  }

  toHome() {
    this.app.getRootNav().setRoot(HomePage);
  }

  toCategories() {
    this.app.getRootNav().setRoot(BaseCategoryPage);
  }

  toJourney() {
    var id;
    if( this.authService.isAuthenticated() ) {
      id = this.authService.userProfile.id
    }
    this.app.getRootNav().setRoot( MyJourneyPage, {id: id || 2} );
  }

}
