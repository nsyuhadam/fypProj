import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile';
import { DashboardPage } from '../dashboard/dashboard';
//import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  profileRef$: Observable <any>
  profileData: Observable <any>
  profile= {} as Profile
  userProf: AngularFireObject<any>
  userId: any
  //profileData: Observable <any>
  //

  constructor(private firebasedb: AngularFireDatabase, private firebaseauth: AngularFireAuth, private toast: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    const profileId=this.navParams.get('$key');
    this.userId=profileId;
    this.profileRef$=this.firebasedb.object(`profile/${profileId}`).valueChanges();
    this.profileRef$.subscribe(profile => this.profile=profile);

    this.firebaseauth.authState.take(1).subscribe(data => {
      this.profileData= this.firebasedb.object(`profile/${data.uid}`).valueChanges();
    })
    
  }

  ionViewDidLoad() {
    
  }

  updateProfile(profileData:Profile){
    //this.profileRef$=this.firebasedb.object(`profile/${profileId}`).update(profileData);
    this.firebasedb.object(`profile/${this.userId}`).update(profileData);
  }

 


}