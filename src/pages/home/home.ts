import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { ExplorePage } from '../explore/explore';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoSignUp(){
    this.navCtrl.push(RegisterPage);
  }
 
  gotoLogin(){
    this.navCtrl.push(LoginPage);
  }

  gotoExplore(){
    this.navCtrl.push(ExplorePage);
  }
}
