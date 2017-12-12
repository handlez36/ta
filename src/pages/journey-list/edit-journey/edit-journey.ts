import { Journey } from './../../../models/journey';
import { Category } from './../../../models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MocSqliteDataServiceProvider } from '../../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthLockProvider } from '../../../providers/auth-lock/auth-lock';

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
  private currentUser;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private ViewCtrl: ViewController,
    private dataService: MocSqliteDataServiceProvider,
    private authService: AuthLockProvider) 
    {
      let param = navParams.get('journey');
      if (param)
        this.journey = param;

      this.dataService.getAll('category')
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

    this.currentUser = this.authService.getCurrentUser();
  }

  update(journey) {
    this.journey.title = this.formControls().title.value;
    this.journey.description = this.formControls().description.value;
    this.journey.category_id = this.formControls().category.value.id;

    this.ViewCtrl.dismiss(this.journey);
  }

}
