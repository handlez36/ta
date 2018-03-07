import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private user:     any;
  private journies: object[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dataService: MocSqliteDataServiceProvider) 
  {
    this.user = navParams.get('user');
    this.journies = null;
  }

  ionViewDidLoad() {
    console.log('ProfilePage#ionViewDidLoad');

    this.dataService.getAll('journey', { user_id: this.user.user_id }, { with: ['category']} )
      .subscribe( journies => this.journies = journies )
  }

}
