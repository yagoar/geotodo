import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TodoDetailsPage } from "../todo-details/todo-details";
import { Todo } from '../../models/todo';
import { Geofence } from 'ionic-native';

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})

export class TodoListPage {

    todoList: Array<Todo>;
 
    constructor(private navCtrl: NavController, platform: Platform) {
    
    }
 
    ionViewDidEnter() {
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }

        Geofence.getWatched().then((resp)=> {
            console.log(JSON.stringify(resp));
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });

    }
 
    complete(index: number) {
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }

    delete(index: number) {

        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }
 
    add() {
        this.navCtrl.push(TodoDetailsPage);
    }

    edit(index: number) {
        this.navCtrl.push(TodoDetailsPage, { todo : this.todoList[index], index: index });
    }

}
