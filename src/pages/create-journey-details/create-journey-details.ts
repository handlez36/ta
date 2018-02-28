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
  }

  submit() {
    debugger;
  }

  formControls() { return this.journeyDetailForm.controls }

}
