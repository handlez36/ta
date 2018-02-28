import { CreateJourneySummaryPage } from './../create-journey-summary/create-journey-summary';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CreateJourneyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-journey-details',
  templateUrl: 'create-journey-details.html',
})
export class CreateJourneyDetailsPage {

  category:    any;
  journeyDetailForm:  any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private formsBuilder: FormBuilder) 
  {
    var numRequirement: RegExp = new RegExp('\\d+');

    this.journeyDetailForm = this.formsBuilder.group({
      title:                ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      description:          [""],
      duration:             ["", Validators.compose([Validators.required, Validators.pattern(numRequirement)])],
      durationUnit:         ["", Validators.required],
      public:               [true, Validators.compose([Validators.required])],
      comments:             [true, Validators.compose([Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateJourneyDetailsPage');

    this.category = this.navParams.get('category')
  }

  toStep1() {
    this.navCtrl.pop();
  }

  toStep3() {
    console.log("In toStep3")
    var journey = 
    {
      title: this.formControls().title.value,
      category_id: this.category.id,
      description: this.formControls().description.value,
      duration: this.formControls().duration.value + "-" + this.formControls().durationUnit.value,
      public: this.formControls().public.value,
      comments: this.formControls().comments.value
    }

    this.navCtrl.push( CreateJourneySummaryPage, { journey: journey, category: this.category } )
  }

  formControls() { return this.journeyDetailForm.controls }

}
