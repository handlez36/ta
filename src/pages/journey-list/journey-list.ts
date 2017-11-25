import { Observable } from 'rxjs/Observable';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List } from 'ionic-angular';

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
  @ViewChild(List) list: List;

  public testObserver;
  public testObservable: Observable<any>;
  public testList = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private journeyDataService: JourneyDataServiceProvider) {
  }

  ionViewWillEnter() {
    this.loadJournies();
  }

  loadJournies() {
    this.journeyDataService.getAll()
      .subscribe(journies => {
        if(journies) {
          this.journies = journies;
        }
      });

    this.journeyListener = this.journeyDataService.getUpdates()
      .subscribe( updatedJournies => {
        console.log("Journey-list.ts received journey update");
        this.journies = updatedJournies;
      });
  }

  add() {
    let modal = this.modalCtrl.create('AddJourneyPage');

    modal.present();

    modal.onDidDismiss( newJourney => {
      if(newJourney) {
        console.log("Adding journey to service");
        this.journeyDataService.add(newJourney);
      }
    })
  }

  editJourneyModal(journey) {
    let modal = this.modalCtrl.create('EditJourneyPage', { journey: journey} );
    let index = this.journies.indexOf(journey);

    modal.present();

    modal.onDidDismiss( updatedJourney => {
      if(updatedJourney) {
        this.journeyDataService.update(index, updatedJourney);
      } else {
        this.list.closeSlidingItems();
      }
    })
  }

  removeJourney(journey) {
    let index = this.journies.indexOf(journey);
    if (index > 0) {
      this.journeyDataService.delete(index);
    }
  }

}