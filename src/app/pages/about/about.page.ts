import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import pkg from '@/package.json';
import pkgLock from '@/package-lock.json';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPageComponent implements OnInit {

  readonly pkg = pkg;
  readonly appDependencies = Object.entries(pkgLock.dependencies)
    .filter(([name, def]) => !def['dev'])
    .map(([name, def]) => ({ name, version: def.version }))

  showAppDependencies = false;

  params: Params;
  thirdPartyLicenses: string;

  constructor(private route: ActivatedRoute, readonly location: Location) { }

  async ngOnInit() {
    this.params = this.route.snapshot.params;
    const thirdPartyResponse = await fetch('/3rdpartylicenses.txt');
    if (!thirdPartyResponse.ok) {
      this.thirdPartyLicenses = 'Unable to load third party notices, check the GitHub repo for more details.'
    } else {
      this.thirdPartyLicenses = await thirdPartyResponse.text();
    }
  }

  toggleShowAppDependencies() {
    this.showAppDependencies = !this.showAppDependencies
  }

}
