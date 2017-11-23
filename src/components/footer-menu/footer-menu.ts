import { BaseCategoryPage } from './../../pages/base-category/base-category';
import { HomePage } from './../../pages/home/home';
import { App, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

/**
 * Generated class for the FooterMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-menu',
  templateUrl: 'footer-menu.html'
})
export class FooterMenuComponent {

  text: string;

  constructor(private navCtrl: NavController, private app: App) { }

  toHome() {
    this.app.getRootNav().setRoot(HomePage);
  }

  toCategories() {
    // this.navCtrl.push( CategoriesPage );
    // this.navCtrl.push(BaseCategoryPage);
    this.app.getRootNav().setRoot(BaseCategoryPage);
  }

}
