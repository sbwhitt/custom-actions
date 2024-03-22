import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionName',
  standalone: true
})
export class ActionNamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "tab-left":
        return "Move Tab Left";
      case "tab-right":
        return "Move Tab Right";
      case "duplicate":
        return "Duplicate Tab";
      case "promote":
        return "Promote Tab";
      case "open-last":
        return "Open Last Location";
      case "collapse":
        return "Collapse All Tabs";
      default:
        return value;
    }
  }

}
