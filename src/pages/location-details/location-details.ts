import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, ToastController } from 'ionic-angular';
import {Geolocation, PositionError, Geoposition, Geofence} from 'ionic-native';
import { LocationObj } from '../../models/location';

import L from "leaflet";
import {Todo} from "../../models/todo";
import {GeofenceObject} from "../../models/geofence-obj";


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

  locationList: Array<LocationObj>;
  location: LocationObj;

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
                  this.location = new LocationObj("", resp.coords.latitude, resp.coords.longitude, 3, 200);
                  this.updateMarker(this.center);
                  this.updateCircle(this.center);
                  loader.dismiss(); 
              }).catch((error) => {
                  
                  console.log('Error getting location', JSON.stringify(error));
                  this.location = new LocationObj("Stuttgart", 48.773976, 9.170984 ,3, 200 );
                  this.center= {lat: 48.773976, lng: 9.170984};              
                  this.updateMarker(this.center);
                  this.updateCircle(this.center);
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

      let loader = this.loadingController.create({
          content: 'Änderung werden gespeichert...',
      });

      loader.present().then(() => {
          if(this.location.name != "") {

              if(this.navParams.get('location') != null) {
                  this.locationList[this.navParams.get('index')] = this.location;

                  let todoList : Array<Todo> = JSON.parse(localStorage.getItem("todos"));
                  for(let todo of todoList) {
                      if(todo.location.id === this.location.id) {
                          todo.location = this.location;
                          Geofence.remove(todo.geofence.id).then((resp) => {
                              console.log('Successfully removed geofence');

                              todo.geofence = new GeofenceObject(todo, this.location);

                              Geofence.addOrUpdate(todo.geofence).then(() => {
                                  console.log('Successfully added/updated geofence');
                              }).catch((error) => {
                                  console.log('Error adding geofence', error);
                              });
                          }).catch((error) => {
                              console.log('Error removing geofence', error);
                          });
                      }
                  }

              } else {
                  this.locationList.push(this.location);
              }

              localStorage.setItem("locations", JSON.stringify(this.locationList));
              loader.dismiss();
              this.navCtrl.pop();
          }

      });
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
       this.updateMarker(this.center);
       this.updateCircle(this.center);
     });

     L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { detectRetina: true}).addTo(this.map);

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

  updateCircleByCurrentPosition(){
    this.updateCircle(this.center);
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
      });
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
