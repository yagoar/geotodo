import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { TodoListPage } from '../pages/todo-list/todo-list';
import { LocationListPage } from '../pages/location-list/location-list';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import { TodoDetailsPage } from "../pages/todo-details/todo-details";
import { LocationDetailsPage } from "../pages/location-details/location-details";

@NgModule({
  declarations: [
    MyApp,
    LocationListPage,
    TodoListPage,
    MapPage,
    SettingsPage,
    TabsPage,
    TodoDetailsPage,
    LocationDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    LocationDetailsPage
  ],
  providers: [
  ]
})
export class AppModule {}
