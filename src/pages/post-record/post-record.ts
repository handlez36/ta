import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

/**
 * Generated class for the PostRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-record',
  templateUrl: 'post-record.html',
})
export class PostRecordPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    private mediaCapture: MediaCapture) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostRecordPage');
    
    let options: CaptureImageOptions = { limit: 3 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => console.log(data),
        (err: CaptureError) => console.error(err.code)        
      )
  }

  gotoHome() {
    this.app.getRootNav().setRoot( HomePage );
  }

}
