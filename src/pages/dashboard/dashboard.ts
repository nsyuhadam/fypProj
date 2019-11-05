import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
//import { ProfilePage } from '../profile/profile';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { database } from 'firebase';
import { Profile } from "../../models/profile";
import { Picture } from "../../models/pic";


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  
  profile= {} as Profile;
  profileData: Observable <any>
  profileId: string;
  pic: string[]
  
  
  constructor(private firebasestore: AngularFireStorage,private firebaseauth: AngularFireAuth, private firebasedb: AngularFireDatabase, private toast: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    
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
        this.profileId=data.uid;

        //this.pic=this.firebasedb.object(`img/${data.uid}`).valueChanges();
        
        let retPic : Array<string> = [];
        this.firebasedb.database.ref('img').child(data.uid).on('value',(snapshot) => {
          snapshot.forEach((child) => {
            console.log(child.key, child.val());
            var length=retPic.push(child.val());
            console.log("array length: " + length);
            
          })
          this.pic=retPic;
        })
        
      }
      else {
        this.toast.create({
          message:`Could not find authentication details`,
          duration: 3000
        }). present();
      }
    })

    
    
    
    /*const picref=this.firebasestore.ref('images/' + this.firebaseauth.auth.currentUser.uid+ '/dfb2dc4a-39cc-4f1e-9f30');
    this.pic=picref.getDownloadURL().toPromise().then((url) => {
      this.retPic=url;
      console.log(url);
    });*/
  }


  openEditProfile(profileData: Profile){
    console.log(profileData.firstname);
    this.navCtrl.push(EditProfilePage, {profileId:profileData.$key});
  }
/*openEditProfile(profile: Profile){
    this.navCtrl.push(EditProfilePage, {profileId: profile.$key});
  } */
}
