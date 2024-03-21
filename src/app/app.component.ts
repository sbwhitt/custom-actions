import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { getActive, setActive } from "../modules/state";
import { ActionsListComponent } from './actions-list/actions-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgIf,
    NgFor,
    ActionsListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'custom-actions';
  active = true;
  menuOpen = false;

  ngOnInit() {
    getActive((val: boolean) => {
      this.active = val;
    });
  }

  toggleActive() {
    this.active = !this.active;
    setActive(this.active);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
