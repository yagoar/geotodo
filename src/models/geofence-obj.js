"use strict";
var notification_1 = require('./notification');
var angular2_uuid_1 = require('angular2-uuid');
var GeofenceObject = (function () {
    function GeofenceObject(todo, location) {
        this.id = angular2_uuid_1.UUID.UUID();
        this.todoId = todo.id;
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.transitionType = location.transitionType;
        this.radius = location.radius;
        this.notification = new notification_1.Notification(todo.title + " in Location " + location.name);
    }
    GeofenceObject.prototype.updateGeofenceValues = function (todo, location) {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.radius = location.radius;
        this.notification = new notification_1.Notification(todo.title + " in Location " + location.name);
        return this;
    };
    return GeofenceObject;
}());
exports.GeofenceObject = GeofenceObject;
