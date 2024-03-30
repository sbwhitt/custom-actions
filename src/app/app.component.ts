import { Component } from "@angular/core";
import { CommonModule, NgIf } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { VersionService } from "./services/version.service";
import { getCurrentTab } from "../modules/actions";
import { WarningComponent } from "./warning/warning.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgIf,
    WarningComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  constructor(private versionService: VersionService) {}

  title = "custom-actions";
  warning = false;
  version = this.versionService.getVersion();

  ngOnInit() {
    getCurrentTab((t: chrome.tabs.Tab) => {
      if (t.url?.startsWith("chrome://") || t.url?.startsWith("file://")) {
        this.warning = true;
      }
    });
  }
}
