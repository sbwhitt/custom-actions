import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { KeyNamePipe } from './key-name.pipe';
import { getActive, setActive, getShortcuts } from "../modules/state";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIf, NgFor, KeyNamePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom-actions';
  active = true;
  shortcuts: Shortcut[] = [];
  menuOpen = false;

  ngOnInit() {
    getActive((val: boolean) => {
      this.active = val;
    });

    getShortcuts().then((val: Shortcut[]) => {
      this.shortcuts = val;
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
