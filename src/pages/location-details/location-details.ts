import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Location } from '../../models/location';

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

  public locationList: Array<Location>;
  public location:Location;

  constructor(public navCtrl: NavController, 
    private navParams : NavParams,
    private loadingController: LoadingController) {

    this.locationList = JSON.parse(localStorage.getItem("locations"));
    if(!this.locationList) {
      this.locationList = [];
    }

    var passedLocation = navParams.get('location');
    console.log(JSON.stringify(passedLocation));
    if(passedLocation != null) {
        this.location = passedLocation;
    } else {
        let loader = this.loadingController.create({
          content: 'Aktuelle Position wird ermittelt...',
        });

        loader.present().then(() => {
          Geolocation.getCurrentPosition().then((resp) => {
            this.location = new Location("test",resp.coords.latitude,resp.coords.longitude,200);
            loader.dismiss();
          }).catch((error) => {
            console.log('Error getting location', error);
          });
  
        });
    }
  }

  save() {

      if(this.location.name != "") {
            this.locationList.push(this.location);
            localStorage.setItem("locations", JSON.stringify(this.locationList));
            this.navCtrl.pop();
      }

    }

}
