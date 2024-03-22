import { Routes } from '@angular/router';
import { PowerComponent } from './power/power.component';
import { ActionsListComponent } from './actions-list/actions-list.component';

export const routes: Routes = [
  { path: "", component: PowerComponent },
  { path: "settings", component: ActionsListComponent }
];
