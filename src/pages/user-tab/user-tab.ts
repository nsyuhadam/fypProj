import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExplorePage } from "../explore/explore";
import { BookingPage } from "../booking/booking";
/**
 * Generated class for the UserTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-tab',
  templateUrl: 'user-tab.html',
})
export class UserTabPage {

  tab1Root = ExplorePage;
  tab2Root = BookingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabPage');
  }

}
