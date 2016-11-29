import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Location } from '../../models/location';

import L from "leaflet";

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

    map: any;
    center: {lat: number, lng: number};
    marker: L.Marker;

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
                  this.center = {lat: resp.coords.latitude, lng: resp.coords.longitude};
                  this.location = new Location("", resp.coords.latitude, resp.coords.longitude, 3, 200);
                  loader.dismiss();
              }).catch((error) => {
                  console.log('Error getting location', error);
              });


          });
      }
  
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
        this.map = L.map('map', {
       center: this.center,
       zoom: 13
     });
 
     L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

     if (this.marker) {
       this.marker = this.marker.setLatLng(this.center);
     } else {
       this.marker = L.marker(this.center).addTo(this.map);
     }
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
