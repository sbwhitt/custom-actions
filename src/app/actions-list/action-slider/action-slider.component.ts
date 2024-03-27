import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-action-slider",
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: "./action-slider.component.html",
  styleUrl: "./action-slider.component.scss"
})
export class ActionSliderComponent {
  @Input() active!: boolean;
}
