import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoDetailsPage } from "../todo-details/todo-details";
import { Todo } from '../../models/todo';
import { Geofence } from "ionic-native";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})

export class TodoListPage {

    todoList: Array<Todo>;
    searchControl: FormControl;
    searchTerm: string = '';
 
    constructor(private navCtrl: NavController) {
        this.searchControl = new FormControl();
    }
 
    ionViewDidEnter() {

        this.todoList = JSON.parse(localStorage.getItem("todos"));

        //Apply filter with delay
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
            this.setFilteredItems();
        });

        Geofence.getWatched().then((resp) => {
            console.log(resp);
        }).catch((error) => {
            console.log('Error getting geofences', error);
        });

    }

    setFilteredItems() {
        this.todoList = this.todoList.filter((item) => {
            return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
    }
 
    completeTodo(index: number) {
        Geofence.remove(this.todoList[index].geofence.id).then((resp) => {
            console.log('Successfully removed geofence');
        }).catch((error) => {
            console.log('Error removing geofence', error);
        });
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }

    deleteTodo(index: number) {

        if(this.todoList[index].geofence != null) {
            Geofence.remove(this.todoList[index].geofence.id).then((resp) => {
                console.log('Successfully removed geofence');
            }).catch((error) => {
                console.log('Error removing geofence', error);
            });
        }

        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }
 
    addTodo() {
        this.navCtrl.push(TodoDetailsPage);
    }

    editTodo(index: number) {
        this.navCtrl.push(TodoDetailsPage, { todo : this.todoList[index], index: index });
    }

}
