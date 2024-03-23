import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { KeyNamePipe } from '../pipes/key-name.pipe';
import { ActionNamePipe } from '../pipes/action-name.pipe';
import { Shortcut } from '../../modules/types';
import { getShortcuts } from '../../modules/state';
import { sendMessageToCurrentTab } from '../../modules/actions';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    KeyNamePipe,
    ActionNamePipe
  ],
  providers: [
    KeyNamePipe
  ],
  templateUrl: './actions-list.component.html',
  styleUrl: './actions-list.component.scss'
})
export class ActionsListComponent {
  constructor(private keyName: KeyNamePipe, private router: Router) {}

  shortcuts: Shortcut[] = [];
  shortcutOpen = false;
  currentShortcut: Shortcut | null = null;

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

  getList() {
    if (!this.currentShortcut) return [];
    return this.currentShortcut.sequence;
  }

  getSequence(seq: string[]) {
    let ret = "";
    for (let i = 0; i < seq.length; i++) {
      ret += this.keyName.transform(seq[i]);
      if (i < seq.length-1) ret += " + ";
    }
    return ret;
  }

  runAction() {
    sendMessageToCurrentTab({
      type: "test",
      action: this.currentShortcut?.action
    });
  }

  updateAction() {}
}
