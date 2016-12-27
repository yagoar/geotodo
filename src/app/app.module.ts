import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { TodoListPage } from '../pages/todo-list/todo-list';
import { LocationListPage } from '../pages/location-list/location-list';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { TodoDetailsPage } from "../pages/todo-details/todo-details";
import { LocationDetailsPage } from "../pages/location-details/location-details";
import {LoginPage} from "../pages/login-page/login-page";
import {RegisterPage} from "../pages/register-page/register-page";
import {AuthService} from "../providers/auth-service";

@NgModule({
  declarations: [
    MyApp,
    LocationListPage,
    TodoListPage,
    MapPage,
    SettingsPage,
    TabsPage,
    TodoDetailsPage,
    LocationDetailsPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      platforms: {
        ios: {
          backButtonText: 'Zurück'
        }
      }
    }, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationListPage,
    TodoListPage,
    MapPage,
    SettingsPage,
    TabsPage,
    TodoDetailsPage,
    LocationDetailsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
