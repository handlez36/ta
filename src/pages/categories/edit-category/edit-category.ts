import { Category } from './../../../models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {

  private categoryForm: FormGroup;
  private category;
  private index;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private ViewCtrl: ViewController) 
    {
      this.category = navParams.get('category');

      this.categoryForm = this.formBuilder.group({
        categoryName: [this.category.name, Validators.compose([Validators.minLength(4), Validators.required])]
      });
    }

  formControls() { return this.categoryForm.controls }

  update() {
     let newCategory = new Category(this.categoryForm.value.categoryName, this.category.id);

     this.ViewCtrl.dismiss(newCategory);
  }

}
