export interface Action {
  name: string;
  description: string;
}

export interface Shortcut {
  sequence: string[];
  action: Action;
}
