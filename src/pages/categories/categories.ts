import { MocSqliteDataServiceProvider } from '../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, List } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthLockProvider } from '../../providers/auth-lock/auth-lock';

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
  private isLoggedIn;
  @ViewChild(List) list: List;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dataService: MocSqliteDataServiceProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authService: AuthLockProvider) 
    { 
    }

  loadCategories() {
    console.log("Loading categories");

    this.dataService.getAll('category', null, { bypassCache: true, with: ['journey'] })
      .subscribe( categories => {
        console.log("Categories: ", categories);
        this.categories = categories || [];
      });
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter for Categories.ts");

    this.loadCategories();
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  addCategoryModal() {
    let modal = this.modalCtrl.create('AddCategoryPage');

    modal.present();

    modal.onDidDismiss( (newCategory) => {
      console.log("New Category: ", newCategory);

      if(newCategory) {
        this.dataService.add('category', newCategory)
          .subscribe( 
            data => {},
            error => console.log("Error: ", error),
            () => this.categories = this.dataService.getFromCache('category')
          );
      }
    })
  }

  editCategoryModal(category) {
    let modal = this.modalCtrl.create('EditCategoryPage', { category: category});

    modal.present();

    modal.onDidDismiss( updatedCategory => {
      if(updatedCategory) {
        this.dataService.update(updatedCategory)
          .subscribe(
            data => {},
            error => console.log("Error: ", error),
            () => {
              this.categories = this.dataService.getFromCache('category')
              this.list.closeSlidingItems();
            }
          )
      } else {
        this.list.closeSlidingItems();
      }
    })
  }

  removeCategory(category) {
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
            this.dataService.delete(category)
              .subscribe(
                data => {},
                error => console.log("Error: ", error),
                () => {
                  this.categories = this.dataService.getFromCache('category');
                  this.list.closeSlidingItems();
                }
              )
          }
        }
      ]
    });

    alert.present();
  }

}