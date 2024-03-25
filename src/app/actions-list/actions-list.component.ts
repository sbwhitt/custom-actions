import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ActionNamePipe } from '../pipes/action-name.pipe';
import { Shortcut } from '../../modules/types';
import { getShortcuts } from '../../modules/state';
import { ActionShortcutComponent } from './action-shortcut/action-shortcut.component';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ActionNamePipe,
    ActionShortcutComponent
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
    getShortcuts().then((val: Shortcut[]) => {
      this.shortcuts = val;
    });
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
}
