import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Add page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add',
  templateUrl: 'add-todo.html'
})
export class AddTodoPage {

    public todoList: Array<Object>;
    public todoItem: {title:string, description:string};
 
    constructor(private navCtrl: NavController) {
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if(!this.todoList) {
            this.todoList = [];
        }
        this.todoItem = {title: "", description:""};
    }
 
    save() {
        if(this.todoItem.title != "") {
            this.todoList.push(this.todoItem);
            localStorage.setItem("todos", JSON.stringify(this.todoList));
            this.navCtrl.pop();
        }
    }

}
