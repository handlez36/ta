import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private categoryDataService: CategoryDataServiceProvider,
    private modalCtrl: ModalController) 
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

    modal.onDidDismiss( (newCategory) => {
      this.categories.push(newCategory);
      this.categoryDataService.save(this.categories);
    })

    modal.present();
  }

  updateCategory() {

  }

  removeCategory() {

  }

}
