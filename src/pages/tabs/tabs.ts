import { Component } from '@angular/core';

import { TodoListPage } from '../todo-list/todo-list';
import { LocationListPage } from '../location-list/location-list';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TodoListPage;
  tab2Root: any = LocationListPage;
  tab3Root: any = MapPage;
  tab4Root: any = SettingsPage;
  
  constructor() {

  }
}
