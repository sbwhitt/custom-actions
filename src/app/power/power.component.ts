import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getActive, setActive } from "../../modules/state";

@Component({
  selector: 'app-power',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './power.component.html',
  styleUrl: './power.component.scss'
})
export class PowerComponent {
  active = true;

  ngOnInit() {
    getActive((val: boolean) => {
      this.active = val;
    });
  }

  toggleActive() {
    this.active = !this.active;
    setActive(this.active);
  }
}
