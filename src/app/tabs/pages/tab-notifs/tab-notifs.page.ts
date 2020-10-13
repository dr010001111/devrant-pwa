import { Component, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/services/notification.service';
import { Comment } from 'ts-devrant';

@Component({
  selector: 'app-tab-notifications',
  templateUrl: 'tab-notifs.page.html',
  styleUrls: ['tab-notifs.page.scss']
})
export class TabNotifsPage {

  @HostBinding() id = 'notifs';
  hasErrors: boolean;
  constructor(private notifyService: NotificationService) { }

  @HostListener('window:tab-change', ['$event'])
  tabSelected(event: CustomEvent<{ tab: string }>) {
    if (event.detail.tab === "tab2") {
      this.notifyService.userCheckedNotifications()
    }
  }

  async pushNotificationUpdateRequest(event: CustomEvent) {
    const target = event.target as HTMLIonRefresherElement
    try {
      await this.forceUpdate()
      this.hasErrors = false;
    } catch (e) {
      this.hasErrors = true;
    } finally {
      target.complete();
    }
  }

  async forceUpdate() {
    return this.notifyService.forceUpdate()
  }

  remapToProfile(userId: number) {
    const containsUser = this.notifyService.notifications.username_map[userId]
    if (containsUser) {
      return {
        user_id: userId,
        user_username: containsUser.name,
        user_avatar: containsUser.avatar,
        user_avatar_lg: containsUser.avatar
      } as Comment
    }
  }

  get user_map() {
    if (this.notifyService.notifications) {
      return this.notifyService.notifications.username_map;
    } else {
      return {}
    }
  }

  get notifications() {
    if (this.notifyService.notifications) {
      return this.notifyService.notifications.items
    } else {
      return null;
    }
  }

}
