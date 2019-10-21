import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Camera } from "ionic-native";
import { AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { finalize, take } from 'rxjs/operators';
import 'rxjs/add/operator/take'; 
import { Observable } from 'rxjs';

  

/**
 * Generated class for the UploadPicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-pic',
  templateUrl: 'upload-pic.html',
})
export class UploadPicPage {
  picdata: any
  picurl: Observable<string>;
  mypicref: any
  picref: any
  

  constructor(private firebasestore: AngularFireStorage, private firebaseauth: AngularFireAuth, public alertctrl: AlertController,public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.mypicref=firebasestore.storage.ref('/')
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPicPage');
  }

  takePicture(){
    Camera.getPicture({
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType:Camera.EncodingType.PNG,
      saveToPhotoAlbum:true
    }).then(imagedata => {
      this.picdata=imagedata;
      this.upload();
    })
  }

  //check youtube videos if this is correct
  choosefrmGallery(){
    Camera.getPicture({
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:Camera.EncodingType.PNG,
    }).then(imagedata => {
      this.picdata=imagedata;
      this.upload();
    })
  }

  upload(){
    this.firebaseauth.authState.pipe(take(1)).subscribe(auth => {
      this.mypicref.child('images').child(`${auth.uid}`).child(this.uid())
        .putString(this.picdata, 'base64', { contentType: 'image/png' })
        .then(() => {
          let alert= this.alertctrl.create({
            title: 'Success',
            subTitle: 'Picture uploaded successfully!',
            buttons: ['OK']
          });
          alert.present();
        })
        .catch(error => {
          console.log("Error:", error);
        })
        
     //this.picurl=imgref.getDownloadURL()
        /*.then(savepic => {
          this.picurl = savepic.getDownloadURL();
          console.log("Pic saved successfully");
        })*/

        //console.log(this.picurl);
      /*const picref=this.firebasestore.ref('images/WDNnDiZbMGNmFj3vnvX5eZMSedB3/ fe27f164-4fe3-42d8-b46f');
      this.picurl=picref.getDownloadURL();
      console.log(this.picurl);*/
    })
  }

  uid(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
