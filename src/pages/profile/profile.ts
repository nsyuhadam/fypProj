import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { Profile } from "../../models/profile";
import { AngularFireDatabase } from '@angular/fire/database';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile= {} as Profile;
  constructor(private firebaseauth: AngularFireAuth, private firebasedb: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
  }

  createProfile(){
    this.firebaseauth.authState.take(1).subscribe(auth => {
      this.firebasedb.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.setRoot(DashboardPage));
    })
  }

}
