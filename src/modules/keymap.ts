export class KeyMap {
  private keyMap = new Map();
  numDown = 0;

  get(key: string): boolean {
    return !!this.keyMap.get(key);
  }

  handleDown(key: string): void {
    this.numDown++;
    this.keyMap.set(key, true);
  }

  handleUp(key: string): void {
    this.numDown--;
    this.keyMap.set(key, false);
  }

  reset(): void {
    this.keyMap = new Map();
    this.numDown = 0;
  }
}