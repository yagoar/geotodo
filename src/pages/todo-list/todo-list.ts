import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { TodoDetailsPage } from "../todo-details/todo-details";
import { Todo } from '../../models/todo';
import {Geofence} from "ionic-native";

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

    }
 
    completeTodo(index: number) {
        Geofence.remove(this.todoList[index].id).then((resp) => {
            console.log('Successfully removed geofence');
        }).catch((error) => {
            console.log('Error removing geofence', error);
        });
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }

    deleteTodo(index: number) {

        Geofence.remove(this.todoList[index].id).then((resp) => {
            console.log('Successfully removed geofence');
        }).catch((error) => {
            console.log('Error removing geofence', error);
        });
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
