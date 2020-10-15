import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DevRantService } from '@services/devrant.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute, readonly devrant: DevRantService) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
