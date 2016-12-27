"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var todo_details_1 = require("../todo-details/todo-details");
var ionic_native_1 = require("ionic-native");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
var TodoListPage = (function () {
    function TodoListPage(navCtrl, dataService) {
        this.navCtrl = navCtrl;
        this.dataService = dataService;
        this.searchTerm = '';
        this.searchControl = new forms_1.FormControl();
    }
    TodoListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.setFilteredItems();
        //Apply filter with delay
        this.searchControl.valueChanges.debounceTime(500).subscribe(function (search) {
            _this.setFilteredItems();
        });
        ionic_native_1.Geofence.getWatched().then(function (resp) {
            console.log(resp);
        }).catch(function (error) {
            console.log('Error getting geofences', error);
        });
    };
    TodoListPage.prototype.setFilteredItems = function () {
        this.todoList = this.dataService.filterItems(this.searchTerm);
    };
    TodoListPage.prototype.completeTodo = function (index) {
        ionic_native_1.Geofence.remove(this.todoList[index].geofence.id).then(function (resp) {
            console.log('Successfully removed geofence');
        }).catch(function (error) {
            console.log('Error removing geofence', error);
        });
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    };
    TodoListPage.prototype.deleteTodo = function (index) {
        ionic_native_1.Geofence.remove(this.todoList[index].geofence.id).then(function (resp) {
            console.log('Successfully removed geofence');
        }).catch(function (error) {
            console.log('Error removing geofence', error);
        });
        this.todoList.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(this.todoList));
    };
    TodoListPage.prototype.addTodo = function () {
        this.navCtrl.push(todo_details_1.TodoDetailsPage);
    };
    TodoListPage.prototype.editTodo = function (index) {
        this.navCtrl.push(todo_details_1.TodoDetailsPage, { todo: this.todoList[index], index: index });
    };
    TodoListPage = __decorate([
        core_1.Component({
            selector: 'page-todo-list',
            templateUrl: 'todo-list.html'
        })
    ], TodoListPage);
    return TodoListPage;
}());
exports.TodoListPage = TodoListPage;
