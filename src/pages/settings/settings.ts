import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {User, AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login-page/login-page";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  user : User;

  constructor(public navCtrl: NavController, public authService: AuthService) {
    this.user = this.authService.getUserInfo();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
