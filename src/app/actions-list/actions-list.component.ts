import { Component } from '@angular/core';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { ActionNamePipe } from '../pipes/action-name.pipe';
import { Shortcut } from '../../modules/types';
import { getShortcuts, setShortcuts } from '../../modules/state';
import { ActionShortcutComponent } from './action-shortcut/action-shortcut.component';
import { ActionSliderComponent } from './action-slider/action-slider.component';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    ActionNamePipe,
    ActionShortcutComponent,
    ActionSliderComponent
  ],
  templateUrl: './actions-list.component.html',
  styleUrl: './actions-list.component.scss'
})
export class ActionsListComponent {
  constructor(private router: Router) {}

  shortcuts: Shortcut[] = [];
  currentShortcut: Shortcut | null = null;
  shortcutOpen = false;

  ngOnInit() {
    this.fetchShortcuts();
  }

  fetchShortcuts() {
    getShortcuts().then((val: Shortcut[]) => {
      this.shortcuts = val;
    });
  }

  trackByFunc(index: number, item: Shortcut) {
    return item.action.name;
  }

  goBack() {
    if (this.shortcutOpen) this.shortcutOpen = false;
    else this.router.navigate([""]);
  }

  openShortcut(i: number) {
    this.shortcutOpen = true;
    this.currentShortcut = this.shortcuts[i];
  }

  closeShortcut() {
    this.shortcutOpen = false;
  }

  async toggleActive(s: Shortcut) {
    s.action.active = !s.action.active;
    await setShortcuts(this.shortcuts).then(() => {
      this.fetchShortcuts();
    });
  }
}
