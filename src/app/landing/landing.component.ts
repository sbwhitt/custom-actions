import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VersionService } from '../services/version.service';
import { getActive, setActive } from "../../modules/state";
import { openTab } from '../../modules/actions';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private router: Router, private versionService: VersionService) {}

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

  openSettings() {
    this.router.navigate(["settings"]);
  }

  openSource() {
    const url = "https://github.com/sbwhitt/custom-actions/releases/tag/"
      + this.versionService.getVersion();
    openTab(url);
  }
}
