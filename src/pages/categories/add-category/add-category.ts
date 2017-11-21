import { CategoryDataServiceProvider } from '../../../providers/category-data-service/category-data-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Category } from './../../../models/category';

/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: './add-category.html'
})
export class AddCategoryPage {

  categoryName = "";

  private categoryForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private ViewCtrl: ViewController,
    private categoryService: CategoryDataServiceProvider) 
    {
      this.categoryForm = this.formBuilder.group({
        categoryName: ['', Validators.required]
      });
    }

  ionViewDidLoad() {
  }

  add(element) {
    let newCategory = new Category(1, this.categoryForm.value.categoryName);

    this.ViewCtrl.dismiss(newCategory);
  }

}
