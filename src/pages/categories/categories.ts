import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, List } from 'ionic-angular';

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
  @ViewChild(List) list: List;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private categoryDataService: CategoryDataServiceProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController) 
    { 
      
    }

  ionViewDidLoad() {
    // Load categories
    this.categoryDataService.getAll()
      .then( categories => {
        if(categories) {
          this.categories = JSON.parse(categories);
        }
      });
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

}
