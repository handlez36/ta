import { JourneyListPage } from './../journey-list/journey-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriesPage } from './../categories/categories';

/**
 * Generated class for the BaseCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-base-category',
  template: 
  `
  <ion-header>
    <ion-navbar>
      <ion-title>Search</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-tabs tabsPlacement="top" tabsHighlight="true">
    <ion-tab tabIcon="apps" tabTitle="Categories" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="briefcase" tabTitle="Journies" [root]="tab2">Journies</ion-tab>
  </ion-tabs>
  `
})
export class BaseCategoryPage {

  private tab1: any;
  private tab2: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.tab1 = CategoriesPage;
    this.tab2 = JourneyListPage;
  }

  ionViewDidLoad() {
    console.log('BaseCategoryPage#ionViewDidLoad');
  }

}
