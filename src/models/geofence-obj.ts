import { Location } from './location';
import { Todo } from './todo';
import { Notification } from './notification';
import { UUID } from 'angular2-uuid';

export class GeofenceObject {

    id:string;
    todoId:string;
    latitude:number;
    longitude:number; 
    transitionType:number;
    radius:number;
    notification:Notification;

    constructor(todo:Todo, location:Location) {
       this.id = UUID.UUID();
       this.latitude = location.latitude;
       this.longitude = location.longitude;
       this.transitionType = location.transitionType;
       this.radius = location.radius;
       this.notification = this.createNotification(todo.title, todo.description, location.name);
    }

    createNotification(title:string, description:string, location:string) {
        var title = `${title} in ${location}`;
        return new Notification( title, description );
    }

    updateGeofenceValues(todo:Todo, location:Location) {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.radius = location.radius;
        this.notification = this.createNotification(todo.title, todo.description, location.name);
        return this;
    }
}