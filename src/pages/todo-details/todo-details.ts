import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Location } from '../../models/location';
import { Todo } from '../../models/todo';
import { Geofence } from 'ionic-native';
import {GeofenceObject} from "../../models/geofence-obj";

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
            Geofence.getWatched().then((resp) => {
                let geofences = JSON.parse(resp);
                this.todoItem.geofence = geofences.find(geofence => geofence.todoId === this.todoItem.id)[0];

            }).catch((error) => {

            });
            this.todoItem = new Todo("","",null);
        }
    }

    updateGeofence() {

        if(this.todoItem.location != null) {
            if(this.todoItem.geofence == null) {
                this.todoItem.geofence = new GeofenceObject(this.todoItem, this.todoItem.location);
            }

            Geofence.addOrUpdate(this.todoItem.geofence).then((resp) => {
                console.log('Successfully added/updated geofence');
                Geofence.removeAll();
            }).catch((error) => {
                console.log('Error adding geofence', error);
            });

        } else {

            Geofence.remove(this.todoItem.geofence.id).then((resp) => {
                console.log('Successfully removed geofence');
            }).catch((error) => {
                console.log('Error removing geofence', error);
            });
        }
    }

    save() {
        if(this.todoItem.title != "") {

            this.updateGeofence();

            //Update todoItem in todoList or push into todoList
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
