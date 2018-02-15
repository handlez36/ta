import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

/**
 * Generated class for the PostOptionModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-option-modal',
  templateUrl: 'post-option-modal.html',
})
export class PostOptionModalPage {

  private POST_TYPES = ['Video', 'Audio', 'Blog'];
  private user: any;
  private journies: any;
  private postOptions: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    private dataService: MocSqliteDataServiceProvider) 
  {
    this.postOptions = this.formBuilder.group({
      whichJourney: [],
      postType: [this.POST_TYPES[0]]
    });
  }

  ionViewDidLoad() {
    console.log('PostOptionModalPage#ionViewDidLoad');
    // Get user passed to modal
    this.user = this.navParams.get('user');

    this.dataService.getAll('journey', {user_id: this.user.sub}, {})
      .subscribe( journies => this.journies = journies )
  }

  formControls() { return this.postOptions.controls }

  update() {
    console.log("PostOptionsModalPage#update");
    let options = {}

    options['journey_id'] = this.formControls().whichJourney.value;
    options['post_type'] = this.formControls().postType.value;

    this.viewCtrl.dismiss(options);
  }

}
