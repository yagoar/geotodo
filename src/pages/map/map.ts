import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Todo } from '../../models/todo';


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

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

        console.log('MapPage constructor');  

  }

  ionViewDidEnter() {

        console.log('MapPage ViewDidEnter');


        //Get list of todos from local storage
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }

      console.log('length of list: '+ this.todoList.length);
    
      this.todoList.forEach(function(todo) {
      // Set marker for every location in map
      // check if there is more than one todo for a location
      console.log('Title', todo.title);
     
      });
      //console.log(this.todoList[0].location.latitude);

  }

  
  ionViewDidLoad() {
    console.log('MapPage ViewDidLoad');

    // alert: short introduction to the user about the function of this page
    this.showAlert();

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
