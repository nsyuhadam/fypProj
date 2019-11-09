import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from "@ionic-native/native-geocoder";

/**
 * Generated class for the ExplorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  lat: number;
  long: number;
  address: any;

  constructor(private nativegeocoder: NativeGeocoder, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');

    //get client's current address
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.long=resp.coords.longitude;
      console.log('Latitude:' + this.lat);
      console.log('Longitude' + this.long);

      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      }

      //find address from coordinate
      this.nativegeocoder.reverseGeocode(this.lat,this.long,options)
        .then((result: NativeGeocoderReverseResult[]) => this.address=JSON.stringify(result[1]))
        .catch((error: any) => console.log(error));
      
    })
    .catch((error) => {
      console.log('Error getting location', error);
    })
  }

}
