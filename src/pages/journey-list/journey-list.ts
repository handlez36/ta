import { Schema } from 'js-data';
import { MocSqliteDataServiceProvider } from '../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Journey } from './../../models/journey';
import { Observable } from 'rxjs/Observable';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, List, AlertController, App } from 'ionic-angular';
import { AuthLockProvider } from '../../providers/auth-lock/auth-lock';
import { JourneyDetailPage } from './../../pages/journey-detail/journey-detail';

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

  journies:                       any = [];
  journeyListener:                any;
  @ViewChild(List) list:          List;
  private isLoggedIn:             any;
  private page:                   string;

  public testObserver:            any;
  public testObservable:          Observable<any>;
  public testList =               [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private dataService: MocSqliteDataServiceProvider,
    private authService: AuthLockProvider) 
  {
    this.page = 'search';
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    
    this.loadJournies();
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  loadJournies() {
    this.dataService.getAll('journey', {}, { force: true, with: ['category', 'user'] })
      .subscribe( journies => {this.journies = journies || []; console.log("Journies: ", this.journies) } )
  }

  add() {
    let modal = this.modalCtrl.create('AddJourneyPage');

    modal.present();

    modal.onDidDismiss( newJourney => {
      if(newJourney) {
        this.dataService.add('journey', newJourney)
          .subscribe(
            (data) => {},
            (error) => console.log("Error: ", error),
            () => this.journies = this.dataService.getFromCache('journey') 
          )
      }
    })
  }

  editJourneyModal(journey) {
    let modal = this.modalCtrl.create('EditJourneyPage', { journey: journey} );

    modal.present();

    modal.onDidDismiss( updatedJourney => {
      if(updatedJourney) {
        this.dataService.update(updatedJourney)
          .subscribe(
            data => console.log("Returned data: ", data),
            error => console.log("Error updating journey: ", error),
            () => { 
              this.journies = this.dataService.getFromCache('journey'); 
              this.list.closeSlidingItems(); 
            }
          )
      } else {
        this.list.closeSlidingItems();
      }
    })
  }

  removeJourney(journey) {  
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: `Are you sure you want to remove the ${(journey && journey.name)} journey?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => this.list.closeSlidingItems()
        },
        {
          text: 'Remove',
          role: 'remove',
          handler: () => { 
            this.dataService.delete(journey)
              .subscribe(
                data => {},
                error => console.log("Error: ", error),
                () => {
                  this.journies = this.dataService.getFromCache('journey'); 
                  this.list.closeSlidingItems(); 
                }
              )
          }
        }
      ]
    });

    alert.present();
  }

  goToJourneyDetail(journey) {
    // this.navCtrl.push('JourneyDetailPage', { id: journey.id} );JourneyDetailPage
    this.app.getRootNav().setRoot(JourneyDetailPage, { id: journey.id} );
  }

}