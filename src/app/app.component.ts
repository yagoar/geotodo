import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar, Splashscreen, Geofence, LocalNotifications } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import {GeofenceObject} from "../models/geofence-obj";
import {Notification} from "../models/notification";


@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

    rootPage = TabsPage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();

            LocalNotifications.schedule({
                at: new Date(new Date().getTime() + 20000),
                title: 'Local Notification Example',
                text: 'Multi Notification 1'
            });

            Geofence.initialize().then((resp) => {
                console.log("Successful geofence initialization");

                Geofence.onTransitionReceived().subscribe((geofences) => {

                    //Parse triggered geofences into Geofence objects
                    let geofenceObjects : Array<GeofenceObject> = geofences;

                    let notifications : Array<Notification> = [];

                    for( let geofence of geofenceObjects) {
                        console.log("Geofence crossed " + geofence.id);
                        notifications.push(geofence.notification);
                    }

                    //Schedule all notifications
                    LocalNotifications.schedule([{
                        id: 1,
                        at: new Date(new Date().getTime() + 10000),
                        title: 'Local Notification Example',
                        text: 'Multi Notification 1'
                    },{
                        id: 2,
                        at: new Date(new Date().getTime() + 10000),
                        title: 'Local Notification Example',
                        text: 'Multi Notification 2'
                    }]);

                    LocalNotifications.on('schedule', function(notification) {
                        console.log("scheduled " + JSON.stringify(notification));
                    });
                });
            }).catch((error) => {
                console.log("Error", JSON.stringify(error));
            });
        });
    }
}
