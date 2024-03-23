import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ActionsListComponent } from './actions-list/actions-list.component';

export const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "settings", component: ActionsListComponent }
];
