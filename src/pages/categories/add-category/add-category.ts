import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  private categoryName: string = "";

  private categoryForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private ViewCtrl: ViewController) 
    {
      this.categoryForm = this.formBuilder.group({
        categoryName:         ['', Validators.compose([Validators.minLength(4), Validators.required])],
        categoryDescription:  ['']
      });
    }

  ionViewDidLoad() {
  }

  formControls() { return this.categoryForm.controls }

  add(element) {
    let newCategory = 
    {
      name:           this.formControls().categoryName.value,
      description:    this.formControls().categoryDescription.value
    }
    
    this.ViewCtrl.dismiss(newCategory);
  }

}
