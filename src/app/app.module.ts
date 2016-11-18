import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { TodosPage } from '../pages/todos/todos';
import { LocationsPage } from '../pages/locations/locations';
import { MapPage } from '../pages/map/map';
import { SettingsPage } from '../pages/settings/settings';
import {AddPage} from "../pages/add/add";

@NgModule({
  declarations: [
    MyApp,
    LocationsPage,
    TodosPage,
    MapPage,
    SettingsPage,
    TabsPage,
    AddPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocationsPage,
    TodosPage,
    MapPage,
    SettingsPage,
    TabsPage,
    AddPage
  ],
  providers: []
})
export class AppModule {}
