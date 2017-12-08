import { AuthLockProvider } from './../../../providers/auth-lock/auth-lock';
import { Journey } from './../../../models/journey';
import { CategoryDataServiceProvider } from '../../../providers/category-data-service/category-data-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddJourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-journey',
  templateUrl: 'add-journey.html',
})
export class AddJourneyPage {

  private journeyForm: FormGroup;
  private currentUser;
  categories;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private ViewCtrl: ViewController,
    private categoryDataService: CategoryDataServiceProvider,
    private authService: AuthLockProvider) 
    {
      this.journeyForm = formBuilder.group({
        title: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        description: [''],
        category: ['', Validators.required]
      })
    }

  ionViewDidLoad() {
    this.categoryDataService.getAll()
      .subscribe( categories => {
        if(categories)
          this.categories = categories
       });

    this.currentUser = this.authService.getCurrentUser();
  }

  formControls() { return this.journeyForm.controls }

  add() {
    // let newCategory = new Category(this.categoryForm.value.categoryName);
    let newJourney = new Journey(
      this.formControls().title.value,
      this.formControls().category.value,
      this.formControls().description.value,
      this.currentUser.sub
    )
    
    this.ViewCtrl.dismiss(newJourney);
  }

}
