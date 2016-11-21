import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Location } from '../../models/location';
import { Todo } from '../../models/todo';

@Component({
  selector: 'page-todo-details',
  templateUrl: 'todo-details.html'
})
export class TodoDetailsPage {

    todoList: Array<Todo>;
    todoItem: Todo;
    locationsList: Array<Location>;
 
    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }
        this.locationsList = JSON.parse(localStorage.getItem("locations"));
        if(!this.locationsList) {
            this.locationsList = [];
        }

        var passedTodo = navParams.get('todo');
        if(passedTodo != null) {
            this.todoItem = passedTodo;
        } else {
            this.todoItem = new Todo("","",null);
        }
        
    }

    updateLocation() {
        console.log(this.todoItem.location.name);
        this.todoItem.updateGeofence();
    }
 
    save() {
        if(this.todoItem.title != "") {
            this.todoList.push(this.todoItem);
            localStorage.setItem("todos", JSON.stringify(this.todoList));
            this.navCtrl.pop();
        }
    }

}
