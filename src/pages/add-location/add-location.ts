import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the AddLocation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html'
})
export class AddLocationPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AddLocation Page');
  }

  save() {
        this.navCtrl.pop();
    }

}
