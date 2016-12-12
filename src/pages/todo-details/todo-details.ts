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

        //Get list of todos from local storage
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }

        //Get list of location from local storage
        this.locationsList = JSON.parse(localStorage.getItem("locations"));
        if(!this.locationsList) {
            this.locationsList = [];
        }

        //Get passed todoItem parameter (edit button)
        let passedTodo = this.navParams.get('todo');
        if(passedTodo != null) {
            this.todoItem = passedTodo;
            //Set watched geofence for current todoItem
            Geofence.getWatched().then((resp) => {
                let geofences = JSON.parse(resp);
                console.log(resp);
                if(geofences != null) {
                    this.todoItem.geofence = geofences.find(geofence => geofence.todoId === this.todoItem.id)[0];
                }

            }).catch((error) => {
                console.log("Error getting watched geofence", JSON.stringify(error));
            });

        } else {
            //Create new todoItem
            this.todoItem = new Todo("","",null);
        }
    }

    updateGeofence() {

        if(this.todoItem.location != null) {
            if(this.todoItem.geofence == null) {
                this.todoItem.geofence = new GeofenceObject(this.todoItem, this.todoItem.location);
            }

            Geofence.addOrUpdate(this.todoItem.geofence).then(() => {
                console.log('Successfully added/updated geofence');
            }).catch((error) => {
                console.log('Error adding geofence', error);
            });

        } else {
            if(this.todoItem.geofence != null) {
                Geofence.remove(this.todoItem.geofence.id).then(() => {
                    console.log('Successfully removed geofence');
                }).catch((error) => {
                    console.log('Error removing geofence', error);
                });
            }
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
