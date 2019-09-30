import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile';
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
  //use to fetch
  profileData: Observable <any>

  //fetch from the model
  profile: Profile = {
    key: '',
    firstname:'',
    lastname:'',
    age: '',
    phonenumber:'',
  }

  profileRef$: AngularFireObject<Profile>;

  


    //profileRef$: AngularFireObject <Profile>
    

  constructor(private firebasedb: AngularFireDatabase, private firebaseauth: AngularFireAuth, private toast: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    //reference to the node in firebase
    this.profileRef$ =this.firebasedb.object('profile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.firebaseauth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid){
        //fetch value from db based on the uid to be displayed on form first
        this.profileData= this.firebasedb.object(`profile/${data.uid}`).valueChanges();
      }
      else {
        this.toast.create({
          message:`Could not find authentication details`,
          duration: 3000
        }). present();
      }
    })
//
  }

  /*updateProfile(){
    this.firebaseauth.authState.take(1).subscribe(auth =>{
      //problem at this line, data wont update, if use set, entire node is gone?
      this.firebasedb.object(`profile/${auth.uid}`).update(this.profile)
        .then(() => this.navCtrl.setRoot(DashboardPage));

      console.log(auth.uid);
  })
  }*/

 


}
