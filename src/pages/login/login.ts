import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController } from "ionic-angular";
//import { ProfilePage } from "../profile/profile";
import { DashboardPage } from '../dashboard/dashboard';
import { MainTabPage } from '../main-tab/main-tab';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('username') user;
  @ViewChild('password') password;
  constructor(private firebaseauth: AngularFireAuth,public alertctrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async userLogin(){
    this.firebaseauth.auth.signInWithEmailAndPassword(this.user.value,this.password.value)
    .then(data =>{
      console.log("user logged in successfully", this.firebaseauth.auth.currentUser);
      let alert= this.alertctrl.create({
        title: 'Success',
        subTitle: 'You are now logged in!',
        buttons: ['OK']
      });
      alert.present();

      //navigate to dashboard with data- uid
      
      this.navCtrl.setRoot(MainTabPage);
    })
  .catch(error => {
    console.log("error logging in", error);
  })
  }

}
