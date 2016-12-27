import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Geofence, LocalNotifications} from 'ionic-native';
import { GeofenceObject } from "../models/geofence-obj";
import { Notification } from "../models/notification";
import { LoginPage } from "../pages/login-page/login-page";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

    rootPage = LoginPage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();

            Geofence.initialize().then((resp) => {
                console.log("Successful geofence initialization");
            }).catch((error) => {
                console.log("Error", JSON.stringify(error));
            });

            Geofence.onTransitionReceived().subscribe((geofences) => {

                console.log("Transition received");

                //Parse triggered geofences into Geofence objects
                let geofenceObjects: Array<GeofenceObject> = geofences;

                let notifications: Array<Notification> = [];

                for (let geofence of geofenceObjects) {
                    console.log("Geofence crossed " + geofence.id);
                    notifications.push(geofence.notification);
                }

                //Schedule all notifications
                LocalNotifications.schedule(notifications);

            });
        });
    }

}
