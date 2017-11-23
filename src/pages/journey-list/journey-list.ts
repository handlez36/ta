import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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

  journies = [];
  journeyListener;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private journeyDataService: JourneyDataServiceProvider) {
  }

  ionViewDidLoad() {
    // Load journies from SQLite storage
    this.journeyDataService.getAll()
      .then( journies => this.journies = JSON.parse(journies) );

    this.journeyListener = this.journeyDataService.getUpdates()
      .subscribe( updatedJourneyList => this.journies = updatedJourneyList);
  }

  add() {
    let modal = this.modalCtrl.create('AddJourneyPage');

    modal.present();

    modal.onDidDismiss( newJourney => {
      if(newJourney) {
        this.journeyDataService.add(newJourney);
      }
    })
  }

  update() {

  }

  delete() {

  }

}