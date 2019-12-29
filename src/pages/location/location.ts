import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from "@ionic-native/native-geocoder";


/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapRef:ElementRef;
  lat:number;
  long:number;
  phlat:any;
  phlong:any;
  phAddress: any;

  option: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  }

  constructor(private nativegeocoder: NativeGeocoder, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.phAddress=this.navParams.get('phAddress');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    this.showMap();
  }

  showMap(){
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    //get current user location
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
      directionsRenderer.setMap(map);
      this.nativegeocoder.forwardGeocode(this.phAddress, this.option)
        .then((coordinates:NativeGeocoderForwardResult[]) => {
          this.phlat= coordinates[0].latitude;
          this.phlong= coordinates[0].longitude;
          
          this.calculateAndDisplayRoute(directionsService, directionsRenderer, this.phlat, this.phlong);
        })
        .catch((error:any) => console.log(error));
      
      
      
    })
    .catch((error) => {
      console.log('Error getting location', error);
    })
  }


  calculateAndDisplayRoute(directionsService, directionsRenderer, phlat, phlong) {
    directionsService.route(
        {
          origin: new google.maps.LatLng(this.lat,this.long),
          destination: new google.maps.LatLng(phlat, phlong),
          travelMode: 'DRIVING'
        },
        function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            console.log('Directions request failed due to ' + status);
          }
        });
  }

}
