import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

/**
* Generated class for the PostRecordPage page.
*
*  See https://ionicframework.com/docs/components/#navigation for more info on
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
    private camera: Camera,
    private mediaCapture: MediaCapture) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostRecordPage');
  }

  takePicture() {
    this.takeCameraPicture();
    // let options: CaptureImageOptions = { limit: 3 };
    // let i = 2;
    // this.mediaCapture.captureImage(options)
    //   .then(
    //     (data: MediaFile[]) => console.log(data),
    //     (err: CaptureError) => console.error(err.code)        
    //   )
  }

  takeCameraPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log("Error: ", err);
    });
  }

  gotoHome() {
    this.app.getRootNav().setRoot( HomePage );
  }

}
