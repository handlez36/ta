import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';
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

  private categories:   any;
  private backgrounds:  string[];
  private assets_dir:   string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private app: App,
    private dataService: MocSqliteDataServiceProvider) 
  {
    this.assets_dir = "assets/imgs/";
    this.backgrounds = [
      "assets/imgs/health.jpeg",
      "assets/imgs/health2.jpeg",
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
        this.categories.forEach( cat => {
          (cat.bg_image) ?
            cat.background = `${this.assets_dir}${cat.bg_image}.jpeg` :
            cat.background = this.getRandomBackground();
        })
       })
  }

  step2(category) {
    this.navCtrl.push(CreateJourneyDetailsPage, { category: category })
    // this.app.getRootNav().setRoot(CreateJourneyDetailsPage)
  }

  addCategoryModal() {
    let modal = this.modalCtrl.create( 'AddCategoryPage' );

    modal.present();

    modal.onDidDismiss( (newCategory) => {
      if(newCategory) {
        this.dataService.add('category', newCategory)
          .subscribe( 
            data => data.background = this.getRandomBackground(),
            error => console.log("CreateJourneyCategoryPage#addCategoryModal -- Error adding category: ", error),
            () => this.categories = this.dataService.getFromCache('category')
          );
      }
    })
  }

}