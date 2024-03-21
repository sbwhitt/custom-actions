import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { setActive, getActive } from "../modules/state";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom-actions';
  active = true;

  // ngOnInit() {
    // const powerIcon = document.getElementById("powerIcon");
    // // initialize power icon state
    // getActive((active: boolean) => {
    //   this.handlePowerIcon(active);
    // });
    // powerIcon?.addEventListener("click", (e) => {
    //   getActive((active: boolean) => {
    //     this.handlePowerIcon(!active);
    //     setActive(!active);
    //   });
    // });
  // }

  // handlePowerIcon(active: boolean) {
  //   if (!active) {
  //     document.getElementById("powerIconPath")?.setAttribute("fill", "gray");
  //   }
  //   else {
  //     document.getElementById("powerIconPath")?.setAttribute("fill", "blue");
  //   }
  // }
}
