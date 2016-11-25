import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Location } from '../../models/location';
import { Todo } from '../../models/todo';
import { Geofence } from 'ionic-native';
import { GeofenceObject } from '../../models/geofence-obj';

@Component({
  selector: 'page-todo-details',
  templateUrl: 'todo-details.html'
})
export class TodoDetailsPage {

    todoList: Array<Todo>;
    todoItem: Todo;
    locationsList: Array<Location>;
 
    constructor(private navCtrl: NavController, private navParams: NavParams, private platform: Platform) {
         this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }
        this.locationsList = JSON.parse(localStorage.getItem("locations"));
        if(!this.locationsList) {
            this.locationsList = [];
        }

        let passedTodo = this.navParams.get('todo');
        if(passedTodo != null) {
            this.todoItem = passedTodo;
        } else {
            this.todoItem = new Todo("","",null);
        }
    }

    updateLocation() {
        console.log(this.todoItem.location.name);
        
        //   this.todoItem.getWatchedGeofence();
        // this.todoItem.updateGeofence();
    }
 
    save() {
        if(this.todoItem.title != "") {
            if(this.navParams.get('todo') != null) {
                this.todoList[this.navParams.get('index')] = this.todoItem;
            } else {
                this.todoList.push(this.todoItem);
            }
            localStorage.setItem("todos", JSON.stringify(this.todoList));
            this.navCtrl.pop();
        }
    }

}
