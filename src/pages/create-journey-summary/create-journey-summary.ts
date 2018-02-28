import { AuthLockProvider } from './../../providers/auth-lock/auth-lock';
import { AuthProvider } from './../../providers/auth/auth';
import { Category } from './../../models/category';
import { JourneyDetailPage } from './../journey-detail/journey-detail';
import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the CreateJourneySummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-journey-summary',
  templateUrl: 'create-journey-summary.html',
})
export class CreateJourneySummaryPage {

  private journey:  any;
  private category: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private authService: AuthLockProvider,
    public dataService: MocSqliteDataServiceProvider) 
  {
  }

  ionViewDidLoad() {
    console.log('CreateJourneySummaryPage#ionViewDidLoad');

    // Retrieve journey
    this.journey = this.navParams.get('journey');
    this.category = this.navParams.get('category');
  }

  toStep2() {
    this.navCtrl.pop();
  }
  
  createJourney() {
    console.log("CreateJourneySummaryPage#createJourney");
    // debugger;

    this.journey.user_id = this.authService.userProfile.sub

    this.dataService.add('journey', this.journey)
      .subscribe(
        journey => this.app.getRootNav().setRoot(JourneyDetailPage, { id: journey.id }),
        err => console.log("Error adding journey")
      )
  }

}
