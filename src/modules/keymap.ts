export class KeyMap {
  private keyMap = new Map();

  get(key: string): boolean {
    return !!this.keyMap.get(key);
  }

  getNumDown(): number {
    let ret = 0;
    for (let k of this.keyMap.entries()) {
      if (k[1]) ret++;
    }
    return ret;
  }

  handleDown(key: string): void {
    this.keyMap.set(key, true);
  }

  handleUp(key: string): void {
    this.keyMap.set(key, false);
  }

  reset(): void {
    this.keyMap = new Map();
  }
}