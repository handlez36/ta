import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CreateJourneyDetailsPage } from '../create-journey-details/create-journey-details';

/**
 * Generated class for the CreateJourneyCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-journey-category',
  templateUrl: 'create-journey-category.html',
})
export class CreateJourneyCategoryPage {

  private categories: any;
  private backgrounds: string[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    private dataService: MocSqliteDataServiceProvider) 
  {
    this.backgrounds = [
      "assets/imgs/category_background.jpg",
      "assets/imgs/health.jpeg",
      "assets/imgs/photography.jpeg",
      "assets/imgs/wedding.jpeg",
    ]
  }

  getRandomBackground() {
    return this.backgrounds[
      Math.floor( Math.random() * this.backgrounds.length )
    ];
  }

  ionViewDidLoad() {
    console.log('CreateJourneyCategoryPage#ionViewDidLoad');

    // Load categories
    this.dataService.getAll('category', {}, { with: ['journey']})
      .subscribe( categories => {
        this.categories = categories
        
        // Assign a temporary background
        this.categories.forEach( cat => cat.background = this.getRandomBackground() )
       })
  }

  step2(category) {
    this.navCtrl.push(CreateJourneyDetailsPage, { category: category })
    // this.app.getRootNav().setRoot(CreateJourneyDetailsPage)
  }

}