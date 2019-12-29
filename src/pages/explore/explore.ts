import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { Geolocation } from "@ionic-native/geolocation";
import { AngularFireDatabase } from "@angular/fire/database";
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from "@ionic-native/native-geocoder";
import { PhProfilePage } from "../ph-profile/ph-profile";
//import { RegisterPage } from '../register/register';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  @ViewChild('map') mapRef:ElementRef;

  lat: number;
  long: number;
  name: string; 
  distanceUser: string[]
  
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  }

  constructor(private nativegeocoder: NativeGeocoder, private firebasedb: AngularFireDatabase, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
    this.showMap();
  }

  

  showMap(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
      
      const location= new google.maps.LatLng(this.lat, this.long);

    const options= {
      center: location,
      zoom: 10,
      cancelable:true
    }

    const map= new google.maps.Map(this.mapRef.nativeElement, options);
    this.userPoint(this.lat, this.long, map);

    this.firebasedb.list('/profile').snapshotChanges().subscribe((res) => {
      let tempArray:any=[];
      //let tempphAddress:any=[];
      let tempDistance : Array<string> = [];
      res.forEach((ele) => {
        //tempArray.push(ele.payload.child('address').val());
        var uid=ele.payload.key;
        console.log('USER ID: ' + uid);
        var add=ele.payload.child('address').val();
        var nameP=ele.payload.child('firstname').val();
        var phlat: any;
        var phlong: any;
        this.nativegeocoder.forwardGeocode(add, this.options)
        .then((coordinates:NativeGeocoderForwardResult[]) => {
          phlat= parseFloat(coordinates[0].latitude);
          phlong= parseFloat(coordinates[0].longitude);
          this.addMarker(phlat, phlong, map, nameP, uid)
        })//end of then geocode;
      })// end of foreach   
    })
    })
  }


  addMarker(lat, long, maps, name, photographerID){
    
    var marker= new google.maps.Marker({
      position:{lat:lat, lng:long},
      map: maps
    });

    var infoWindow= new google.maps.InfoWindow({
      content: '<h3> ' + name + '</h3><br><h4>' + photographerID +'</h4>'
    });

    marker.addListener('click', function() {
      infoWindow.open(maps,marker);
    });

    google.maps.event.addListener(infoWindow, "closeclick", (user) => {
      this.navCtrl.push(PhProfilePage, {photographerID:photographerID});
    });
  
  }


  userPoint(lat, long, maps){
    var iconBase ='https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    return new google.maps.Marker({
      position:{lat:lat, lng:long},
      map: maps,
      icon: iconBase + 'beachflag.png'
    })
  }

  

}
