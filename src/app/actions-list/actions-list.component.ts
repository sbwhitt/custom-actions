import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { KeyNamePipe } from '../pipes/key-name.pipe';
import { ActionNamePipe } from '../pipes/action-name.pipe';
import { Shortcut } from '../../modules/types';
import { getShortcuts } from '../../modules/state';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [
    NgFor,
    KeyNamePipe,
    ActionNamePipe
  ],
  templateUrl: './actions-list.component.html',
  styleUrl: './actions-list.component.scss'
})
export class ActionsListComponent {
  shortcuts: Shortcut[] = [];

  ngOnInit() {
    getShortcuts().then((val: Shortcut[]) => {
      this.shortcuts = val;
    });
  }
}
