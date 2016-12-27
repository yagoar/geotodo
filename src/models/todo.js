"use strict";
var angular2_uuid_1 = require('angular2-uuid');
var Todo = (function () {
    function Todo(title, description, location) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.id = angular2_uuid_1.UUID.UUID();
    }
    return Todo;
}());
exports.Todo = Todo;
