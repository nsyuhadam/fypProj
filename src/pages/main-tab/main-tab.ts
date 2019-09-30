import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { UploadPicPage } from '../upload-pic/upload-pic';
import { NotificationPage } from '../notification/notification';
import { HomePage } from '../home/home';

/**
 * Generated class for the MainTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-tab',
  templateUrl: 'main-tab.html',
})
export class MainTabPage {

  tab1Root = DashboardPage;
  tab2Root = UploadPicPage;
  tab3Root = NotificationPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainTabPage');
  }

}
