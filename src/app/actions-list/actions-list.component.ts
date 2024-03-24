import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { KeyNamePipe } from '../pipes/key-name.pipe';
import { ActionNamePipe } from '../pipes/action-name.pipe';
import { Shortcut } from '../../modules/types';
import { getActive, getShortcuts, setActive, setShortcuts } from '../../modules/state';
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
  constructor(private router: Router) {}

  shortcuts: Shortcut[] = [];
  currentShortcut: Shortcut | null = null;
  inputSequence: string[] = [];
  promptText: string = "";
  shortcutOpen = false;
  recording = false;
  wasActive = false;

  ngOnInit() {
    getShortcuts().then((val: Shortcut[]) => {
      this.shortcuts = val;
    });
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.recording) return;
    event.preventDefault();
    if (this.inputSequence.includes(event.code)) return;
    if (this.inputSequence.length < 3)
      this.inputSequence.push(event.code);
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

  getCurrentSequence(): string[] {
    if (!this.currentShortcut) return [];
    return this.currentShortcut.sequence;
  }

  runAction() {
    sendMessageToCurrentTab({
      type: "test",
      action: this.currentShortcut?.action
    });
  }

  updateAction() {
    getActive().then((active) => {
      if (active) {
        setActive(false);
        this.wasActive = true;
      }
      else this.wasActive = false;
      this.recording = true;
    });
    this.promptText = "Enter key sequence...";
  }

  isEqual(seq1: string[], seq2: string[]): boolean {
    if (seq1.length !== seq2.length) return false;
    for (let i = 0; i < seq1.length; i++) {
      if (seq1[i] !== seq2[i]) return false;
    }
    return true;
  }

  duplicateShortcut(sequence: string[]): boolean {
    for (let shortcut of this.shortcuts) {
      if (this.isEqual(sequence, shortcut.sequence)) return true;
    }
    return false;
  }

  validSequence(): boolean {
    if (this.inputSequence.length < 2) {
      this.promptText = "Key sequence too short!";
      this.inputSequence = [];
      return false;
    }
    if (this.duplicateShortcut(this.inputSequence)) {
      this.promptText = "Key sequence already in use!";
      this.inputSequence = [];
      return false;
    }
    return true;
  }

  saveRecording() {
    if (!this.validSequence()) return;
    if (this.currentShortcut) {
      this.currentShortcut.sequence = this.inputSequence;
      setShortcuts(this.shortcuts);
    }
    this.cancelRecording();
  }

  cancelRecording() {
    if (this.wasActive) {
      setActive(true);
    }
    this.recording = false;
    this.inputSequence = [];
  }
}
