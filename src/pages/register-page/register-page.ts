import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login-page/login-page";

@Component({
  selector: 'page-register-page',
  templateUrl: 'register-page.html'
})
export class RegisterPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public authService : AuthService, public alertCtrl: AlertController) {
    this.username = '';
    this.password = '';
  }

  register() {
    if(this.authService.register(this.username, this.password)){
      console.log("Successfully registered");
      this.navCtrl.setRoot(TabsPage);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Registrierung fehlgeschlagen',
        subTitle: 'Benutzername existiert bereits',
        buttons: ['Okay']
      });
      alert.present();
    }
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
