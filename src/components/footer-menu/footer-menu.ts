import { CategoriesPage } from '../../pages/categories/categories';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

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

  constructor(private navCtrl: NavController) {
    this.text = 'Hello World';
  }

  toCategories() {
    this.navCtrl.push( CategoriesPage );
  }

}
