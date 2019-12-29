import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from 'ionic-native';


/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  @ViewChild('map') mapRef:ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    this.showMap();
  }

  showMap(){
    const location= new google.maps.LatLng(3.139003,101.686852);

    const options= {
      center: location,
      zoom: 10
    }

    const map= new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, map);
  }

  addMarker(loc, maps){
    return new google.maps.Marker({
      position:loc,
      map: maps
    })
  }

}
