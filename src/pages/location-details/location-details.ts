import { mapTo } from 'rxjs/operator/mapTo';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Geolocation, PositionError, Geoposition } from 'ionic-native';
import { Location } from '../../models/location';

import L from "leaflet";


const OPT_GEOLOCATION = { maximumAge: 12000, timeout: 5000, enableHighAccuracy: false};

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

    map: any;
    center: {lat: number, lng: number};
    marker: L.Marker;
    circle: L.Circle;
    following = false;
    subscription: any;

  locationList: Array<Location>;
  location:Location;

  constructor(public navCtrl: NavController, 
    public navParams : NavParams,
    public loadingController: LoadingController,
    public platform:Platform,
    public toastCtrl: ToastController) {

    this.center= {lat: 47.773976, lng: 9.170984};

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
                  this.updateMap(this.center);
                  loader.dismiss(); 
              }).catch((error) => {
                  
                  console.log('Error getting location', JSON.stringify(error));
                  this.location = new Location("Stuttgart", 48.773976, 9.170984 ,3, 200 );
                  this.center= {lat: 48.773976, lng: 9.170984};              
                  this.updateMap(this.center);
                  loader.dismiss();
              });

          });
      }
  
  }

  ionViewDidLoad(){
    
      console.log("Load map!");

    setTimeout(this.initMap.bind(this), 100);
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

  initMap(){
      console.log("Load map!");

        this.map = L.map('map', {
       center: this.center,
       zoom: 13
     });

     this.map.on('click', (e) =>{
       
       console.log("event fired", JSON.stringify(e.latlng));

       this.location.latitude = e.latlng.lat;
       this.location.longitude = e.latlng.lng;
       this.center = {lat: e.latlng.lat, lng: e.latlng.lng};
       this.updateMap(this.center);
     });

     L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

     this.updateMap(this.center);
  }

  updateMap(latlng: {lat: number, lng: number}){
    this.updateMarker(this.center);
     this.updateCircle(this.center);
  }

   updateMarker(latlng: {lat: number, lng: number}) {
    if (this.marker) {
      this.marker = this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng).addTo(this.map);
    }

    this.map.setView(this.center);
  }

  updateCircle(latlng: {lat: number, lng: number}){

     if (this.circle) {
      this.circle = this.circle.setLatLng(latlng);
      this.circle = this.circle.setRadius(this.location.radius);
    } else {
      this.circle = L.circle(latlng, this.location.radius).addTo(this.map);
    }
  }

  toggleFollow() {
    //follow disabled: start follow
    if (!this.following) {
      if (!Geolocation || !Geolocation.watchPosition) {
        this.errorToast({ code: 901, message: "no Geolocation available"});
      }

      this.subscription = Geolocation.watchPosition(OPT_GEOLOCATION).subscribe(data => {
        //case: data = PositionError
        if ((data as Geoposition).coords === undefined) {
          var positionError = (data as PositionError);
          this.errorToast(positionError);

        //case: data = Geoposition
        } else {
          var geoposition = (data as Geoposition);
          this.onGeolocationUpdate(geoposition);
        }
      })
    //follow not disabled: stop follow
    } else {
      this.subscription.unsubscribe();
    }
  }

  onGeolocationUpdate(position: Geoposition) {
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
    this.center = latlng;
    this.updateMarker(latlng);
  }

  errorToast(error: PositionError) {
    console.log('Error ' + error.message);
    let toast = this.toastCtrl.create({
      message: 'Error: ' + error.message,
      showCloseButton: true
    });
    toast.present();
  }




}
