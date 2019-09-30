import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FirebaseService } from "../pages/service/firebaseservice";
import { ImagePicker } from '@ionic-native/image-picker/ngx';

//importsss  
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import { RegisterPage } from "../pages/register/register";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { ProfilePage } from "../pages/profile/profile";
import { UploadPicPage } from "../pages/upload-pic/upload-pic";
import { MainTabPage } from "../pages/main-tab/main-tab";
import { NotificationPage } from "../pages/notification/notification";



import { FIREBASE_CREDENTIALS } from "./firebase.credential";
import { AngularFireDatabaseModule } from '@angular/fire/database';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    EditProfilePage,
    ProfilePage,
    UploadPicPage,
    MainTabPage,
    NotificationPage
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //Initialize  AngularFire with credentials from the dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    DashboardPage,
    EditProfilePage,
    ProfilePage,
    UploadPicPage,
    MainTabPage,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    FirebaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
   
    
  ]
})
export class AppModule {}
