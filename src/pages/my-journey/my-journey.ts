import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthLockProvider } from '../../providers/auth-lock/auth-lock';

/**
 * Generated class for the MyJourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-journey',
  templateUrl: 'my-journey.html',
})
export class MyJourneyPage {

  private user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthLockProvider,
    private dataService: MocSqliteDataServiceProvider) 
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyJourneyPage');

    var userid = this.navParams.get("id");
    this.dataService.get( 'user', userid, {} )
      .subscribe( user => this.user = user )
  }

}
