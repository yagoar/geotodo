import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsLatLng, GoogleMapsEvent } from 'ionic-native';
import { Location } from '../../models/location';

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

    map: GoogleMap;

  locationList: Array<Location>;
  location:Location;

  constructor(public navCtrl: NavController, 
    public navParams : NavParams,
    public loadingController: LoadingController,
    public platform:Platform) {

      this.locationList = JSON.parse(localStorage.getItem("locations"));
        if(!this.locationList) {
        this.locationList = [];
      }

      this.location = new Location("test",0,0,3,200);

      let passedLocation = this.navParams.get('location');
    
      if(passedLocation != null) {
        this.location = passedLocation;
      } else {

          let loader = this.loadingController.create({
              content: 'Aktuelle Position wird ermittelt...',
          });

          loader.present().then(() => {
              Geolocation.getCurrentPosition().then((resp) => {
                  console.log('Successfully got current location');
                  this.location = new Location("", resp.coords.latitude, resp.coords.longitude, 3, 200);
                  loader.dismiss();
              }).catch((error) => {
                  console.log('Error getting location', error);
                  this.location = new Location("Stuttgart", 48.77710 , 9.180769 , 3, 200);
                  loader.dismiss();
              });


          });
      }
    platform.ready().then(() => {
            this.loadMap();
        });
  }

  loadMap(){
          let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
    }

  save() {

      if(this.location.name != "") {
            
            if(this.navParams.get('location') != null) {
                this.locationList[this.navParams.get('index')] = this.location;
            } else {
                this.locationList.push(this.location);
            }
            
            localStorage.setItem("locations", JSON.stringify(this.locationList));
            this.navCtrl.pop();
      }

  }



}
