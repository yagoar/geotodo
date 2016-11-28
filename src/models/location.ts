import { UUID } from 'angular2-uuid';
import { Notification } from './notification';

export class Location {

    id:string;
    notification:Notification;

    constructor(
        public name:string, 
        public latitude:number, 
        public longitude:number, 
        public transitionType:number,
        public radius:number) {
            this.id = UUID.UUID();
    }

    createNotification(title:string, description:string) {
        this.notification.title = `${this.notification.title} ${title}`;

    }

}