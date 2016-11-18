import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddPage} from "../add/add";

@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html'
})

export class TodosPage {

   public todoList: Array<Object>;
 
    constructor(private nav: NavController) { }
 
    ionViewDidEnter() {
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        console.log("todos: " + localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }
    }
 
    delete(index: number) {
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    }
 
    add() {
        this.nav.push(AddPage);
    }

}
