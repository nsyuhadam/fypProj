import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Tabs } from 'ionic-angular';
import { Camera } from "ionic-native";
import { AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { finalize, take } from 'rxjs/operators';
import 'rxjs/add/operator/take'; 
import { Observable } from 'rxjs';
import { DashboardPage } from '../dashboard/dashboard';
import { MainTabPage } from '../main-tab/main-tab';

  

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
  @ViewChild('baseTabs') tabRef: Tabs
  picdata: any
  picurl: any
  mypicref: any
  retPic: any;

  constructor(private firebasestore: AngularFireStorage, private firebaseauth: AngularFireAuth, private firebasedb: AngularFireDatabase, public alertctrl: AlertController,public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.mypicref=firebasestore.storage.ref('/')
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPicPage');
  }

  //take photo from camera
  takePicture(){
    Camera.getPicture({
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType:Camera.EncodingType.PNG,
      saveToPhotoAlbum:true,
      targetWidth: 1080,
      targetHeight: 1080
    }).then(imagedata => {
      this.picdata=imagedata;
      this.upload();
    })
  }

  //choose existing photos from gallery
  choosefrmGallery(){
    Camera.getPicture({
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:Camera.EncodingType.PNG,
      targetWidth: 1080,
      targetHeight: 1080
    }).then(imagedata => {
      this.picdata=imagedata;
      this.upload();
    })
  }

  /*upload the selected photos to firebase storage
    save the downloadurl of each image to db according to uid*/
  upload(){
    const picid=this.uid();
    this.firebaseauth.authState.pipe(take(1)).subscribe(auth => {
      const path=this.mypicref.child('images').child(`${auth.uid}`).child(picid)
        .putString(this.picdata, 'base64', { contentType: 'image/png' })
        .then(() => {
          let alert= this.alertctrl.create({
            title: 'Success',
            subTitle: 'Picture uploaded successfully!',
            buttons: [{
              text: 'OK',
              handler:() => {
                //save link to db
                this.firebasedb.object(`img/${auth.uid}/${picid}`).set(this.retPic)
                  .then(() => this.navCtrl.parent.select(0));
              }
            }]
          });
          alert.present();

        //get download url for uploaded pic 
        const picref=this.firebasestore.ref('images/' + this.firebaseauth.auth.currentUser.uid + '/'+ picid);
        this.picurl=picref.getDownloadURL().toPromise().then((url) => {
        this.retPic=url;
        console.log(this.retPic);

        /*push img node to db, each contain node for each user and that node holds url for images
        img
        |-- userid
        |    |--- picid
             |       |-- url: "firebaseimageurl"
             |--- picid
                   |-- url: "firebaseimageurl"
        
        */
         
        
        
        });
          
        })
        .catch(error => {
          console.log("Error: ", error);
          let alert= this.alertctrl.create({
            title: 'Failure',
            subTitle: 'Picture fail to upload!',
            buttons: ['OK']
          });
          alert.present();
        })
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
