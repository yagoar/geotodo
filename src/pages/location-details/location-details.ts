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

    //set default location to prevent error if no Location is found by 'GeoLocation'
    this.center= {lat: 47.773976, lng: 9.170984};
    this.location = new Location("test", this.center.lat, this.center.lng, 3, 200);

    //get current locations out of localStorage save to 'locationList'
    this.locationList = JSON.parse(localStorage.getItem("locations"));
        //if no List is found 'this.locationList' is empty
        if(!this.locationList) {
          this.locationList = [];
        }

    //get a single location out of navParams - this is used if you want to edit a location in localStorage
    //could be 'null' 
    let passedLocation = this.navParams.get('location');
    
      if(passedLocation != null) {
        this.location = passedLocation;
      } else {

          
          let loader = this.loadingController.create({
              content: 'Aktuelle Position wird ermittelt...',
          });
          //shows loading-window with the above set content
          loader.present().then(() => {
              //Find Current Location then update Location and the map. After that closes the loading-window
              Geolocation.getCurrentPosition().then((resp) => {
                  console.log('Successfully got current location');
                  this.center = {lat: resp.coords.latitude, lng: resp.coords.longitude};
                  this.location = new Location("", resp.coords.latitude, resp.coords.longitude, 3, 200);
                  this.updateMap(this.center);
                  loader.dismiss(); 
              }).catch((error) => {
              //If no Location is found reset location to the default Location    
                  console.log('Error getting location', JSON.stringify(error));
                  this.location = new Location("Stuttgart", 48.773976, 9.170984 ,3, 200 );
                  this.center= {lat: 48.773976, lng: 9.170984};              
                  this.updateMap(this.center);
                  loader.dismiss();
              });

          });
      }
  
  }

  //if window is loaded  initMap
  ionViewDidLoad(){
    
      console.log("Load map!");

    setTimeout(this.initMap.bind(this), 100);
  }

  //saves location to localStorage
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
  // inits Map
  initMap(){

      console.log("Load map!");
      //create Map
        this.map = L.map('map', {
       center: this.center,
       zoom: 13
     });
     //create click-event for the map
     //Event updates the locatoin, the marker and the circle around the center
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
  //Updates the map (marker and circle)
    updateMap (latlng: {lat: number, lng: number}){
      this.updateMarker(this.center);
      this.updateCircle(this.center);
    }
    //updates the marker on the map
   updateMarker(latlng: {lat: number, lng: number}) {
    if (this.marker) {
      this.marker = this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng).addTo(this.map);
    }

    this.map.setView(this.center);
  }
  //Updates the circle on the map
  updateCircle(latlng: {lat: number, lng: number}){

     if (this.circle) {
      this.circle = this.circle.setLatLng(latlng);
      this.circle = this.circle.setRadius(this.location.radius);
    } else {
      this.circle = L.circle(latlng, this.location.radius).addTo(this.map);
    }
  }
  //updates the circle by the currentPosition 
  updateCircleByCurrentPosition(){
    this.updateCircle(this.center);
  }

  //method from leaflet-example
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

  //method from leaflet-example
  onGeolocationUpdate(position: Geoposition) {
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
    this.center = latlng;
    this.updateMarker(latlng);
  }

  //method from leaflet-example
  errorToast(error: PositionError) {
    console.log('Error ' + error.message);
    let toast = this.toastCtrl.create({
      message: 'Error: ' + error.message,
      showCloseButton: true
    });
    toast.present();
  }




}
