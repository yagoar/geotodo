import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { RegisterPage } from "../register-page/register-page";
import {AuthService} from "../../providers/auth-service";

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public authService : AuthService, public alertCtrl: AlertController) {
    this.username = '';
    this.password = '';
  }

  login() {
    if(this.authService.login(this.username, this.password)){
      this.navCtrl.setRoot(TabsPage);
    } else {

      let alert = this.alertCtrl.create({
        title: 'Anmeldung fehlgeschlagen',
        subTitle: 'Benutzername oder Passwort sind falsch',
        buttons: ['Okay']
      });
      alert.present();

    }
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
