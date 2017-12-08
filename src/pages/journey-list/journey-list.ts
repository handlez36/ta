import { Journey } from './../../models/journey';
import { Observable } from 'rxjs/Observable';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List, AlertController } from 'ionic-angular';
import { AuthLockProvider } from '../../providers/auth-lock/auth-lock';

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
  private isLoggedIn;

  public testObserver;
  public testObservable: Observable<any>;
  public testList = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private journeyDataService: JourneyDataServiceProvider,
    private authService: AuthLockProvider) {
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    
    this.loadJournies();
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  loadJournies() {
    this.journies = [];

    this.journeyDataService.getAll()
      .subscribe(journies => {
        if(journies) {
          journies.forEach( j => this.journies.push(Journey.createSingleJourney(j)) )
        }
      });

  }

  add() {
    let modal = this.modalCtrl.create('AddJourneyPage');

    modal.present();

    modal.onDidDismiss( newJourney => {
      if(newJourney) {
        // Optimistically add new journey
        this.journies.push(newJourney);

        this.journeyDataService.add(newJourney)
          // Add id of journey as added by API
          // Remove optimistically loaded journey if API raised error
          .subscribe(
            (data) => newJourney.id = data.id,
            (error) => this.journies.pop(),
            () => {}
          )
      }
    })
  }

  editJourneyModal(journey) {
    let modal = this.modalCtrl.create('EditJourneyPage', { journey: journey} );
    let index = this.journies.indexOf(journey);

    modal.present();

    modal.onDidDismiss( updatedJourney => {
      if(updatedJourney) {
        console.log("Updated Journey before sending it to ROR:", updatedJourney);
        // Optimistically edit journey, but keep the old journey just in case
        let oldJourney = this.journies.splice(index,1, updatedJourney)[0];

        // Revert optimistically replaced journey if API raised error
        this.journeyDataService.update(index, updatedJourney)
          .subscribe(
            data => {},
            error => this.journies.splice(index, 1, oldJourney),
            () => {}
          )
      } else {
        this.list.closeSlidingItems();
      }
    })
  }

  removeJourney(journey) {
    let index = this.journies.indexOf(journey);
    
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: `Are you sure you want to remove the ${(journey && journey.name)} journey?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { this.list.closeSlidingItems() }
        },
        {
          text: 'Remove',
          role: 'remove',
          handler: () => { 
            let removedJourney = this.journies.splice(index,1)[0];
            this.journeyDataService.delete(index, removedJourney)
              .subscribe(
                data => {},
                error => this.journies.splice(index, 0, removedJourney),
                () => {}
              )
          }
        }
      ]
    });

    alert.present();
  }

  printJourney(journey) { console.log(journey) }

}