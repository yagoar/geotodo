import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationDetailsPage } from '../location-details/location-details';
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import {LocationObj} from "../../models/location";

@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html'
})
export class LocationListPage {

  locationList: Array<LocationObj>;
  searchControl: FormControl;
  searchTerm: string = '';

  constructor(public navCtrl: NavController) {
      this.searchControl = new FormControl();
  }

  ionViewDidEnter() {

      this.locationList = JSON.parse(localStorage.getItem("locations"));

      //Apply filter with delay
      this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
          this.setFilteredItems();
      });
    }

    setFilteredItems() {
        this.locationList = this.locationList.filter((item) => {
            return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
    }

    deleteLocation(index: number) {
        this.locationList.splice(index, 1);
        localStorage.setItem("locations", JSON.stringify(this.locationList));
    }

    addLocation() {
        this.navCtrl.push(LocationDetailsPage);
    }

    editLocation(index: number) {
        this.navCtrl.push(LocationDetailsPage, { location : this.locationList[index], index: index });
    }

}

