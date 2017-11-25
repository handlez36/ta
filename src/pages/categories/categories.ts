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
  journies = [];
  private journeyCount = {};
  @ViewChild(List) list: List;
  private data: Observable<any>;
  
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
  }

  loadCategories() {
    this.categoryDataService.getAll().subscribe( categories => {
      if(categories) {
        this.categories = categories;
      }
    });
  }

  loadJournies() {
    this.journeyDataService.getAll()
      .subscribe(journies => {
        if(journies) {
          this.updateJourneyCountPerCategory();
        }
      });
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter for Categories.ts");

    this.loadCategories();
    this.loadJournies();
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter for Categories.ts");
  }

  updateJourneyCountPerCategory() {
    this.categories.forEach( category => {
      this.journeyCount[`${category.name}`] = this.journies.filter( 
        journey => journey.category.name === category.name 
      ).length;
    })
  }

  addCategoryModal() {
    let modal = this.modalCtrl.create('AddCategoryPage');

    modal.present();

    modal.onDidDismiss( (newCategory) => {
      if(newCategory) {
        // Optimistically add new category
        this.categories.push(newCategory);

        this.categoryDataService.add(newCategory, newCategory.parameterize())
          // Add id of category as added by API
          // Remove optimistically loaded category if API raised error
          .subscribe( 
            data => newCategory.id = data.id,
            error => this.categories.pop(),
            () => {}
          );
      }
    })
  }

  editCategoryModal(category) {
    let modal = this.modalCtrl.create('EditCategoryPage', { category: category});
    let index = this.categories.indexOf(category);

    modal.present();

    modal.onDidDismiss( (updatedCategory) => {
      if(updatedCategory) {
        // Optimistically edit category, but keep the old category just in case
        let oldCategory = this.categories.splice(index,1, updatedCategory)[0];

        // Revert optimistically replaced category if API raised error
        this.categoryDataService.update(index, updatedCategory)
          .subscribe(
            data => {},
            error => this.categories.splice(index, 1, oldCategory),
            () => {}
          )
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
            let removedCategory = this.categories.splice(index,1)[0];
            this.categoryDataService.delete(index, removedCategory)
              .subscribe(
                data => {},
                error => this.categories.splice(index, 0, removedCategory),
                () => {}
              )
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