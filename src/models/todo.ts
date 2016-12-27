import { LocationObj } from './location';
import { GeofenceObject } from './geofence-obj';
import { UUID } from 'angular2-uuid';

export class Todo {

    id: string;
    geofence: GeofenceObject;

    constructor( 
        public title:string,
        public description:string,
        public location:LocationObj) {
             
        this.id = UUID.UUID();
    }

}