"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var todo_1 = require('../../models/todo');
var ionic_native_1 = require('ionic-native');
var geofence_obj_1 = require("../../models/geofence-obj");
var TodoDetailsPage = (function () {
    function TodoDetailsPage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        //Get list of todos from local storage
        this.todoList = JSON.parse(localStorage.getItem("todos"));
        if (!this.todoList) {
            this.todoList = [];
        }
        //Get list of location from local storage
        this.locationsList = JSON.parse(localStorage.getItem("locations"));
        if (!this.locationsList) {
            this.locationsList = [];
        }
        //Get passed todoItem parameter (edit button)
        var passedTodo = this.navParams.get('todo');
        if (passedTodo != null) {
            this.todoItem = passedTodo;
        }
        else {
            //Set watched geofence for current todoItem
            ionic_native_1.Geofence.getWatched().then(function (resp) {
                var geofences = JSON.parse(resp);
                console.log(resp);
                if (geofences != null) {
                    _this.todoItem.geofence = geofences.find(function (geofence) { return geofence.todoId === _this.todoItem.id; })[0];
                }
            }).catch(function (error) {
                console.log("Error getting watched geofence", JSON.stringify(error));
            });
            //Create new todoItem
            this.todoItem = new todo_1.Todo("", "", null);
        }
    }
    TodoDetailsPage.prototype.updateGeofence = function () {
        if (this.todoItem.location != null) {
            if (this.todoItem.geofence == null) {
                this.todoItem.geofence = new geofence_obj_1.GeofenceObject(this.todoItem, this.todoItem.location);
            }
            ionic_native_1.Geofence.addOrUpdate(this.todoItem.geofence).then(function () {
                console.log('Successfully added/updated geofence');
            }).catch(function (error) {
                console.log('Error adding geofence', error);
            });
        }
    };
    TodoDetailsPage.prototype.deleteLocation = function () {
        var _this = this;
        if (this.todoItem.geofence != null) {
            ionic_native_1.Geofence.remove(this.todoItem.geofence.id).then(function () {
                console.log('Successfully removed geofence');
                _this.todoItem.location = null;
            }).catch(function (error) {
                console.log('Error removing geofence', error);
            });
        }
    };
    TodoDetailsPage.prototype.save = function () {
        if (this.todoItem.title != "") {
            this.updateGeofence();
            //Update todoItem in todoList or push into todoList
            if (this.navParams.get('todo') != null) {
                this.todoList[this.navParams.get('index')] = this.todoItem;
            }
            else {
                this.todoList.push(this.todoItem);
            }
            localStorage.setItem("todos", JSON.stringify(this.todoList));
            this.navCtrl.pop();
        }
    };
    TodoDetailsPage = __decorate([
        core_1.Component({
            selector: 'page-todo-details',
            templateUrl: 'todo-details.html'
        })
    ], TodoDetailsPage);
    return TodoDetailsPage;
}());
exports.TodoDetailsPage = TodoDetailsPage;
