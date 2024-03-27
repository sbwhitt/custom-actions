export interface Action {
  name: string;
  description: string;
  active: boolean;
}

export interface Shortcut {
  sequence: string[];
  action: Action;
}
