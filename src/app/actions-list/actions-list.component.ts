import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { KeyNamePipe } from '../pipes/key-name.pipe';
import { ActionNamePipe } from '../pipes/action-name.pipe';
import { Shortcut } from '../../modules/types';
import { getShortcuts } from '../../modules/state';

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
  constructor(private keyName: KeyNamePipe) {}

  shortcuts: Shortcut[] = [];
  shortcutOpen = false;
  currentShortcut: Shortcut | null = null;

  ngOnInit() {
    getShortcuts().then((val: Shortcut[]) => {
      this.shortcuts = val;
    });
  }

  openShortcut(i: number) {
    this.shortcutOpen = true;
    this.currentShortcut = this.shortcuts[i];
  }

  closeShortcut() {
    this.shortcutOpen = false;
  }

  getSequence(seq: string[]) {
    let ret = "";
    for (let i = 0; i < seq.length; i++) {
      ret += this.keyName.transform(seq[i]);
      if (i < seq.length-1) ret += " + ";
    }
    return ret;
  }
}
