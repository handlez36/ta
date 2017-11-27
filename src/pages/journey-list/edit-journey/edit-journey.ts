import { Journey } from './../../../models/journey';
import { Category } from './../../../models/category';
import { CategoryDataServiceProvider } from './../../../providers/category-data-service/category-data-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditJourneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-journey',
  templateUrl: 'edit-journey.html',
})
export class EditJourneyPage {

  journeyForm: FormGroup;
  journey;
  categories = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private ViewCtrl: ViewController,
    private categoryDataService: CategoryDataServiceProvider) 
    {
      let param = navParams.get('journey');
      if (param) {
        this.journey = param;
        console.log("Journey is ", this.journey);
      }

      this.categoryDataService.getAll()
        .subscribe( categories => {
          if(categories) {
            this.categories = categories;
          }
        })

      this.journeyForm = formBuilder.group({
        title: [this.journey.title, Validators.compose([Validators.required, Validators.minLength(4)])],
        description: [this.journey.description],
        category: [this.journey.category, Validators.required]
      })
    }

  formControls() { return this.journeyForm.controls }

  compareFn(c1: Category, c2: Category) {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditJourneyPage');
  }

  update(journey) {
    let updatedJourney = new Journey(
      this.formControls().title.value,
      this.formControls().category.value,
      this.formControls().description.value,
      this.journey.id
    );

    this.ViewCtrl.dismiss(updatedJourney);
  }

}
