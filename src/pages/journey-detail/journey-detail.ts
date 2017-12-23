import { Subscription } from 'rxjs';
import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the JourneyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journey-detail',
  templateUrl: 'journey-detail.html',
})
export class JourneyDetailPage {

  private journeyId;
  private journey;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    public dataService: MocSqliteDataServiceProvider) 
  {
    this.journeyId = navParams.get('id') || 0;
  }

  ionViewDidLoad() {
    this.dataService.get('journey', this.journeyId, { force: true, with: ['category', 'user', 'post'] })
      .subscribe( journey => this.journey = journey )

    // this.dataService.getAll('journey', { force: true, with: ['category', 'user', 'post'] })
    //   .subscribe( journies => { console.log("Returned journies: ", journies) })
  }

  toJournies() {
    this.app.getRootNav().setRoot('BaseCategoryPage');
  }

}
