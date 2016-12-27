"use strict";
var angular2_uuid_1 = require('angular2-uuid');
var LocationObj = (function () {
    function LocationObj(name, latitude, longitude, transitionType, radius) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.transitionType = transitionType;
        this.radius = radius;
        this.id = angular2_uuid_1.UUID.UUID();
    }
    LocationObj.prototype.createNotification = function (text) {
        this.notification.text = this.notification.text + " " + text;
    };
    return LocationObj;
}());
exports.LocationObj = LocationObj;
