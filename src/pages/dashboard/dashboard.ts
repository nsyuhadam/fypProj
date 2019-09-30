import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  profileData: Observable <any>
  constructor(private firebaseauth: AngularFireAuth, private firebasedb: AngularFireDatabase, private toast: ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DashboardPage');
    this.firebaseauth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid){
        this.toast.create({
          message: `Welcome, ${data.email}`,
          duration: 3000
        }).present();

        this.profileData= this.firebasedb.object(`profile/${data.uid}`).valueChanges();
        
      }
      else {
        this.toast.create({
          message:`Could not find authentication details`,
          duration: 3000
        }). present();
      }
    })
  }


  openEditProfile(){
    this.navCtrl.push(ProfilePage);
  }

}
