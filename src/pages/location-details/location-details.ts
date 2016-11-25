import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Location } from '../../models/location';

@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

  locationList: Array<Location>;
  location:Location;

  constructor(public navCtrl: NavController, 
    public navParams : NavParams,
    public loadingController: LoadingController) {

      this.locationList = JSON.parse(localStorage.getItem("locations"));
        if(!this.locationList) {
        this.locationList = [];
      }

      this.location = new Location("test",0,0,3,200);

      let passedLocation = this.navParams.get('location');
    
      if(passedLocation != null) {
        this.location = passedLocation;
      } else {

          let loader = this.loadingController.create({
              content: 'Aktuelle Position wird ermittelt...',
          });

          loader.present().then(() => {
              Geolocation.getCurrentPosition().then((resp) => {
                  console.log('Successfully got current location');
                  this.location = new Location("", resp.coords.latitude, resp.coords.longitude, 3, 200);
                  loader.dismiss();
              }).catch((error) => {
                  console.log('Error getting location', error);
              });


          });
      }
    
  }

  save() {

      if(this.location.name != "") {
            
            if(this.navParams.get('location') != null) {
                this.locationList[this.navParams.get('index')] = this.location;
            } else {
                this.locationList.push(this.location);
            }
            
            localStorage.setItem("locations", JSON.stringify(this.locationList));
            this.navCtrl.pop();
      }

    }

}
