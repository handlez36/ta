// import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the JourneyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journey-list',
  templateUrl: 'journey-list.html',
})
export class JourneyListPage {

  journies;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // Load journies from SQLite storage
    // this.journies = this.dataService.getAll()
    //   .then( journies => this.journies = journies )
  }

}
