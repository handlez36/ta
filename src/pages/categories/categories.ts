import { CategoryList } from '../../models/category-list';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, List } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories = [];
  private categoryListener;
  private journeyListener;
  journies = [];
  private journeyCount = {};
  @ViewChild(List) list: List;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private categoryDataService: CategoryDataServiceProvider,
    private journeyDataService: JourneyDataServiceProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) 
    { 
      
    }

  ionViewDidLoad() {
    console.log("ionViewDidLoad for Categories.ts")

    // Load categories and setup listener for changes
    this.categoryDataService.getAll().then( categories => this.categories = JSON.parse(categories) );
    this.categoryListener = this.categoryDataService.getUpdates()
      .subscribe(updatedCategories => this.categories = updatedCategories);

    // Load journies and setup listener for changes
    this.journeyDataService.getAll()
      .then( journies => {
        this.journies = JSON.parse(journies);
       });
    // this.journeyListener = this.journeyDataService.getUpdates()
    //   .subscribe( updatedJournies => {
    //     console.log("Categories.ts received journey update");
    //     this.journies = updatedJournies
    //   });

  }

  loadCategories() {
    // Load categories and setup listener for changes
    this.categoryDataService.getAll().then( categories => this.categories = JSON.parse(categories) );
    
    this.categoryListener = this.categoryDataService.getUpdates()
      .subscribe(updatedCategories => this.categories = updatedCategories);
  }

  loadJournies() {
    this.journeyDataService.getAll()
    .then( journies => {
      this.journies = JSON.parse(journies);
     });

    this.journeyListener = this.journeyDataService.getUpdates()
      .subscribe( updatedJournies => {
        console.log("Categories.ts received journey update");
        this.journies = updatedJournies
      });
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter for Categories.ts");
    console.log("Categories", this.categories);

    this.journeyListener = this.journeyDataService.getUpdates()
      .subscribe( updatedJournies => {
        console.log("Categories.ts received journey update");
        this.journies = updatedJournies
      });

    this.categories.forEach( category => {
      console.log("In Will Enter -- Category name:", category.name);
      this.journeyCount[`${category.name}`] = this.journeyCountPerCategory(category);
    })
    console.log("In Will Enter -- Journey count", this.journeyCount);
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter for Categories.ts");
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave for Categories.ts");
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave for Categories.ts");
  }

  ionViewWillUnload() {
    console.log("ionViewWillUnload for Categories.ts");
  }

  journeyCountPerCategory(category) {
    let filteredJournies = this.journies.filter( journey => journey.category.name === category.name );
    
    return filteredJournies.length;
  }

  addCategoryModal() {
    let modal = this.modalCtrl.create('AddCategoryPage');

    modal.present();

    modal.onDidDismiss( (newCategory) => {
      if(newCategory) {
        this.categories.push(newCategory);
        this.categoryDataService.save(this.categories);
      }
    })
  }

  editCategoryModal(category) {
    let modal = this.modalCtrl.create('EditCategoryPage', { category: category});
    let index = this.categories.indexOf(category);

    modal.present();

    modal.onDidDismiss( (updatedCategory) => {
      if(updatedCategory) {
        this.categories.splice(index,1, updatedCategory);
        this.categoryDataService.save(this.categories);
      } else {
        this.list.closeSlidingItems();
      }
    })
  }

  removeCategory(category) {
    let index = this.categories.indexOf(category);

    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: `Are you sure you want to remove the ${(category && category.name)} category?`,
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
            this.categories.splice(index,1);
            this.categoryDataService.save(this.categories);
          }
        }
      ]
    });

    alert.present();
  }

  save() {
    this.categoryDataService.save(this.categories);
  }

}