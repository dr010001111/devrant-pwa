import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { DevRantService } from '@services/devrant.service';
import { applyShadesTo, makeShades } from '@utils/color-utils';
import { getImageURL, Profile } from 'ts-devrant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoading: boolean;

  @Input()
  userId: string;

  profile: Profile & { blocked?: boolean };
  imageUrl: string;

  activeTab: string = "rants";
  hasErrors: boolean;

  constructor(
    private readonly devrant: DevRantService,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router) { }

  async doRefresh(event: CustomEvent) {
    await this.fetchProfile();
    (event.target as HTMLIonRefresherElement).complete()
  }

  async fetchProfile() {
    try {
      this.profile = await this.devrant.getProfile(this.userId)
      this.imageUrl = getImageURL(this.profile.avatar.i);

      applyShadesTo(
        this.elRef.nativeElement,
        makeShades(this.profile.avatar.b)
      );

      this.hasErrors = false
    } catch (e) {
      this.hasErrors = true
    }
  }

  async ngOnInit() {
    this.router.events.subscribe(ev => {
      if (ev instanceof Scroll) {
        this.activeTab = ev.anchor || "rants"
      }
    });

    this.isLoading = true;
    try {
      await this.fetchProfile()
    } finally {
      this.isLoading = false;
    }
  }

}
