import { Location } from './location';
import { GeofenceObject } from './geofence-obj';
import { Geofence } from 'ionic-native';
import { UUID } from 'angular2-uuid';
import { Platform } from 'ionic-angular';

export class Todo {

    id:string;
    geofence:GeofenceObject;

    constructor( 
        public title:string,
        public description:string,
        public location:Location) {
             
        this.id = UUID.UUID();

    }

    getWatchedGeofence() {
        Geofence.getWatched().then((geofencesJson) => {
            var geofences:Array<GeofenceObject> = JSON.parse(geofencesJson);
            var geofence = geofences.find(geofence => geofence.todoId === this.id)[0];
            if(geofence != null){
                this.geofence = geofence;
            }
            
        }).catch((error) => {
            console.log('Error getting watched geofences', JSON.stringify(error));
        });
    }

    updateGeofence() {

        if(this.location != null) {
            if(this.geofence!= null) {
                this.geofence = this.geofence.updateGeofenceValues(this,this.location);
            } else {
                this.geofence = new GeofenceObject(this,this.location);
            }
            
            Geofence.addOrUpdate(this.geofence).then((resp) => {
                console.log('Successfully added/updated geofence');
            }).catch((error) => {
                console.log('Error adding geofence', error);
            });
        } else {
            if(this.geofence != null) {
                this.removeGeofence();
            }
        }
        
    }

    removeGeofence() {
        
    }

}