import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";
import {AlertController  } from "ionic-angular";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('username') user;
  @ViewChild('password') password;
  constructor(private firebaseauth: AngularFireAuth, public alertctrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.user.value,this.password.value)
    .then (data => {
      console.log("user registered successfully", data);
      let alert= this.alertctrl.create({
        title: 'Success',
        subTitle: 'You are now registered!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(LoginPage);
    })
    .catch (error =>{
      console.log("Error registring user", error);
    })
    
    console.log(this.user.value);
  }

}
