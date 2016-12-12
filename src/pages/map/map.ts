import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Todo } from '../../models/todo';
import { Location } from '../../models/location';


import L from "leaflet";

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  todoList: Array<Todo>;
  map: any;
  center: {lat: number, lng: number};
  center2: {lat: number, lng: number};
  distance_: number;

  marker: L.Marker;

  locList: Array<{count: number, name: string, lat: number, lng: number, text: string}>


  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

        console.log('MapPage constructor');  

        // Get list of todos from local storage
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }

        // Manuelles setzen und Speichern der Location zum Testen
        /*
        this.todoList[0].location = new Location("Oktoberfest Muenchen",48.137154, 11.576124,3,200);
        this.todoList[1].location = new Location("Edeka Innenstadt",48.137154, 11.586124,3,200);
        this.todoList[0].location = new Location("Edeka Innenstadt",48.137154, 11.586124,3,200);
         this.todoList[4].location = new Location("DHBW Stuttgart",48.773527, 9.171102,3,200);

        localStorage.setItem("todos", JSON.stringify(this.todoList));
        */

        this.locList = [];

        // create list which contains todo-location with information about todo
        // an element (location) can have multiple todos
        // if a todo has no location, it won't be listed
        this.todoList.forEach((todo,index) => {

                if(todo.location != null){
                  if(todo.location.latitude!=null && todo.location.longitude!=null){
                      var new_loc = true;
                      // check if same location is already used
                      this.locList.forEach((loc,index,array) => {
                          if(loc.name == todo.location.name 
                          && loc.lat == todo.location.latitude
                          && loc.lng == todo.location.longitude){

                            new_loc = false;
                            // combine todos in same marker
                            array[index]['count'] = array[index].count + 1;
                            array[index]['name'] = todo.location.name+'<br> -> '+array[index].count+' Todos'
                            array[index]['text'] =  array[index].text 
                                + '------<br>' + todo.title+'<br>'+todo.description+'<br>';
                          }
                            
                      });

                      // create new marker location for todo
                      if(new_loc==true){
                        this.locList.push({count: 1, name: todo.location.name,
                          lat: todo.location.latitude, lng: todo.location.longitude,
                          text: todo.title+'<br>'+todo.description+'<br>'});
                      }

                  }
                }


        });

        this.distance_ = Number.MAX_VALUE;
        // default Position DHBW Stuttgart
        var ownPosition = {lat: 48.773527, lng: 9.171102}; // take user Position, if available
        var locIndex = -1;
        // calculate distance to closest todo-location
        this.locList.forEach((loc,index) =>{

                var distance = this.getDistanceFromLatLonInKm(loc.lat,loc.lng,ownPosition.lat,ownPosition.lng);
                if (distance < this.distance_){
                    this.distance_ = distance;
                    locIndex = index;
                }
          
        } );

      
  }

  ionViewDidEnter() {

        console.log('MapPage ViewDidEnter');

      /*
      // testing:
      this.todoList.forEach(function(todo) {
      if(todo.location == null ){
      console.log('Todo: '+todo.title+' - No Location = FALSE');
      }
      else{
      console.log('Todo: '+todo.title+' - Location = TRUE');
          }
      });
      */

  }

  
  ionViewDidLoad() {
    console.log('MapPage ViewDidLoad');

    // alert: short introduction to the user about the function of this page
    if(this.distance_ != Number.MAX_VALUE){
    this.showAlert();
  }

    this.center = {lat: 48.773527, lng: 9.171102}; // DHBW Stuttgart
 
    this.initMap();
    // when no map, maybe to use this workaround:
    //setTimeout(this.loadMap.bind(this), 100);

  }


  initMap() {
    // determine position of user or use location of first todo-item
    if(this.locList.length > 0){
      this.center = {lat: this.locList[0].lat, lng: this.locList[0].lng};
    }
     this.map = L.map('map', {
       center: this.center,
       zoom: 12 
       // note: center and zoom are automatically set by using map.fitBounds()
    });
    /*
      this.map.fitBounds([
        [48.773527, 9.171102],
        [48.137154, 11.576124]
        ]);
    */
    

     L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
       .addTo(this.map);
 
     /*
     if (this.marker) {
      this.marker = this.marker.setLatLng(this.center);
     } else {
      this.marker = L.marker(this.center).addTo(this.map);
     }
     */

    // Two options here for setting zoom:
    /* 1. Set zoom to fit all markers 
       2. Set zoom to fit marker of user position and closest todo-lcoation
    */
    var markers =  []

    // set marker 
	  for (var i = 0; i < this.locList.length; i++) {

         this.center = {lat: this.locList[i].lat, 
           lng: this.locList[i].lng};

          this.marker = L.marker(this.center);
          this.marker.bindTooltip(this.locList[i].name, {
            permanent: false,
            direction: 'right',
            interactive: true,
  
          });
          
          this.marker.addTo(this.map).bindPopup(this.locList[i].text);

          markers.push(this.marker);

          
    }

    // Option 1: Set zoom to fit all markers
    var featureGroup = L.featureGroup(markers).addTo(this.map);
    
    this.map.addLayer(featureGroup);
    this.map.fitBounds(featureGroup.getBounds());

    }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Map View',
      subTitle: 'This page gives you an overview where your to-dos are located! You are '
       +this.distance_.toFixed(3)+ ' km away from the closest todo-location',
      buttons: ['OK']
    });
    alert.present();
  }




  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

deg2rad(deg) {
  return deg * (Math.PI/180)
}



}
