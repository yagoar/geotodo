import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoDetailsPage } from "../todo-details/todo-details";
import { Todo } from '../../models/todo';

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})

export class TodoListPage {

    todoList: Array<Todo>;
 
    constructor(private navCtrl: NavController) { 

    }
 
    ionViewDidEnter() {
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }
    }
 
    complete(index: number) {
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }

    delete(index: number) {
        var todo:Todo = this.todoList[index];
        console.log(JSON.stringify(todo));
        todo.removeGeofence();
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }
 
    add() {
        this.navCtrl.push(TodoDetailsPage);
    }

    edit(index: number) {
        this.navCtrl.push(TodoDetailsPage, { todo : this.todoList[index] });
    }

}
