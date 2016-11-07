import { Component } from '@angular/core';

import { TodosPage } from '../todos/todos';
import { LocationsPage } from '../locations/locations';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TodosPage;
  tab2Root: any = LocationsPage;
  tab3Root: any = MapPage;
  tab4Root: any = SettingsPage;
  
  constructor() {

  }
}
