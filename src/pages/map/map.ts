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
          this.todoList[2].location = new Location("Oktoberfest Muenchen",48.137154, 11.576124,3,200);
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
    // this.showAlert();
    
     this.center = {lat: 48.137154, lng: 11.576124}; // Munich
 
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
    });

     L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
       .addTo(this.map);
 
     /*
     if (this.marker) {
      this.marker = this.marker.setLatLng(this.center);
     } else {
      this.marker = L.marker(this.center).addTo(this.map);
     }
     */

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
          
    }

    }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Map View',
      subTitle: 'This page gives you an overview where your to-dos are located! ',
      buttons: ['OK']
    });
    alert.present();
  }



}
