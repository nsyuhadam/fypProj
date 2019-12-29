import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { Geolocation } from "@ionic-native/geolocation";
import { LocationPage } from '../location/location';


declare var google: any;
declare var distancetoPh: any; 
@Component({
  selector: 'page-ph-profile',
  templateUrl: 'ph-profile.html',
})
export class PhProfilePage {

  phId: any; 
  phProfile: Observable <any>;
  pic: string[];
  phAddress: any;
  lat: number;
  long: number;
  

  constructor(private geolocation: Geolocation, private firebasedb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
     this.phId = navParams.get('photographerID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhProfilePage');

    //get user's current location
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
    })
    .catch((error) => {
      console.log('Error getting location', error);
    })

    

    //retrieve photographer's details from database
    this.phProfile=this.firebasedb.object(`profile/${this.phId}`).valueChanges();

    //get photographer's address only
    this.firebasedb.database.ref('profile').child(this.phId).child('address').on('value', (snapshot) => {
      this.phAddress=snapshot.val();
    });
    

    //retrieve photographer's photos
    let retPic : Array<string> = [];
    this.firebasedb.database.ref('img').child(this.phId).on('value',(snapshot) => {
      snapshot.forEach((child) => {
        var length=retPic.push(child.val());
        console.log("array length: " + length);
        })
        this.pic=retPic;
    })
  }

  viewLocation(){
    this.navCtrl.push(LocationPage, {phAddress:this.phAddress});
  }

}
