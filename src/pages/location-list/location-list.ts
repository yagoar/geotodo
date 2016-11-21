import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationDetailsPage } from '../location-details/location-details';

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html'
})
export class LocationListPage {

  locationList:Array<Location>;

  constructor(public navCtrl: NavController) {}

  ionViewDidEnter() {
        this.locationList = JSON.parse(localStorage.getItem("locations"));
        if(!this.locationList) {
            this.locationList = [];
        }
    }

    delete(index: number) {
        this.locationList.splice(index, 1);
        localStorage.setItem("locations", JSON.stringify(this.locationList));
    }

    add() {
        this.navCtrl.push(LocationDetailsPage);
    }

    edit(index: number) {
        this.navCtrl.push(LocationDetailsPage, { location : this.locationList[index] });
    }

}

