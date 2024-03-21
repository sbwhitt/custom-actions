import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyName',
  standalone: true
})
export class KeyNamePipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case "AltLeft":
        return "LAlt";
      case "ControlLeft":
        return "LCtrl";
      case "ShiftLeft":
        return "LShift"
      case "ArrowUp":
        return "Up";
      case "ArrowLeft":
        return "Left";
      case "ArrowDown":
        return "Down";
      case "ArrowRight":
        return "Right";
      default:
        return value;
    }
  }

}
