import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { applyShadesTo, makeShades } from '@utils/color-utils';
import debug from 'debug';
import { SetApiRequest } from 'src/service-worker/messages';
import { getWorker } from 'src/utils/workers';
import * as devRant from 'ts-devrant';
import { Profile } from 'ts-devrant';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { ConfigService } from './config.service';

const log = debug('dr:service:devrant');

devRant.updateConfig({
    api: environment.apiURL,
});

@Injectable({
    providedIn: 'root',
})
export class DevRantService {
    worker: ServiceWorker;

    private _token: devRant.Token = null;
    private _profile?: devRant.Profile;

    userIdCache: Cache;
    activeUserIdQueue = {};

    async getUserIdByName(username) {
        const hitCache = await this.userIdCache.match(username);
        const inActiveQueue = this.activeUserIdQueue[username];

        if (inActiveQueue) {
            return inActiveQueue;
        }

        if (hitCache) {
            return hitCache.json();
        } else {
            const idPromise = devRant.getIdByUsername(username);
            this.activeUserIdQueue[username] = idPromise;

            const idResponse = await idPromise;

            delete this.activeUserIdQueue[username];

            const idCachableResponse = new Response(
                JSON.stringify(idResponse)
            );
            this.userIdCache.put(username, idCachableResponse);

            return idResponse;
        }
    }

    async validateNotifications() {
        if (!this.isSignedIn) {
            return;
        }

        if (Notification.permission === 'default') {
            const alert = await this.alert.create({
                header: 'Notifications',
                subHeader:
                    'To keep you updated, we need you to allow notifications.',
                message: 'We will only push notifications related to devRant.',
                buttons: [
                    'Ask me later',
                    {
                        text: 'Sure!',
                        handler: () => this.requestNotifications(),
                    },
                ],
            });

            alert.present();
        }
    }

    async requestNotifications() {
        const confirmed = await Notification.requestPermission();
        if (confirmed === 'granted') {
            const notification = new Notification('Thanks for confirming!', {
                body: 'This is how a notification could look like.',
                icon: '/assets/icons/icon-128x128.png',
            });
        } else if (confirmed === 'denied') {
            const quirky = await this.alert.create({
                header: 'Bipolar feelings?',
                subHeader: "We won't ask you again",
                message:
                    'If you changed your mind, you can change this in your browser settings.',
                buttons: ['OK'],
            });

            quirky.present();
        }
    }

    get profile(): Partial<Profile> {
        return this._profile || {};
    }

    get profileColor() {
        if (this.profile && this.profile.avatar) {
            return `#${this.profile.avatar.b}`;
        }

        return null;
    }

    constructor(
        private appService: AppService,
        private configService: ConfigService,
        private alert: AlertController,
        private router: Router
    ) {
        log('init');
        this.setupService();
        log('connector', devRant);
    }

    async setupService() {
        const token = JSON.parse(localStorage.getItem('token'));

        await this.setupWorker();

        if (token) {
            this.token = token;
        }

        this.userIdCache = await caches.open('username-id-map');
    }

    async setupWorker() {
        this.worker = await getWorker();
        this.worker.postMessage({
            type: 'setAPI',
            apiURL: environment.loginURL,
        } as SetApiRequest);

        log('worker setup');
    }

    set token(newToken: devRant.Token) {
        this._token = newToken;
        localStorage.setItem('token', JSON.stringify(newToken || null));

        this.worker.postMessage({
            type: 'newToken',
            token: this.token,
        });

        this.getProfile();
        this.validateNotifications();
    }

    get token() {
        return this._token;
    }

    profileUpdated() {
        const ev = new CustomEvent('profile-updated');
        window.dispatchEvent(ev);

        this.updateBrowserTheme();
    }

    updateBrowserTheme() {
        const theme = document.head.querySelector('meta[theme-color]');
        if (theme) {
            theme.setAttribute('content', this.profileColor);
        }

        const shades = makeShades(this.profileColor);
        applyShadesTo(document.documentElement, shades);
    }

    async getProfile(userId?: string, content?: string, skip?: number) {
        // we need to have a token AND the SAME userId as in the token OR no id and we use the id in the token.
        if (!this.token || !userId || userId === String(this.token.user_id)) {
            const request = this.lazyUpdateLoggedInProfile(content, skip);
            if (!this.profile) {
                await request;
            }

            return this._profile;
        } else {
            return this.fetchProfile(userId, content, skip);
        }
    }

    private async fetchProfile(
        userId?: string,
        content?: string,
        skip?: number
    ) {
        debug('feztch profile')
        const response = await devRant.profile(
            userId,
            content,
            skip,
            this.token
        );
        return response.profile;
    }

    async lazyUpdateLoggedInProfile(content?: string, skip?: number) {
        debug('lazyUpdateLoggedInProfile')
        if (!this.token) {
            this._profile = null;
        } else {
            this._profile = await this.fetchProfile(
                String(this.token.user_id),
                content,
                skip
            );
        }

        this.profileUpdated();
        return this._profile;
    }

    async logout() {
        this.token = null;
    }

    async login(username: string, password: string) {
        const { api } = devRant.getConfig();
        devRant.updateConfig({
            api: environment.loginURL
        })

        const response = await devRant.login(username, password);

        devRant.updateConfig({
            api
        })

        if (!response.success) {
            throw new Error(response.error);
        }

        this.token = response.auth_token;
        this.profileUpdated();
        return response.auth_token;
    }

    get isSignedIn() {
        return !!this.token;
    }

    clearNotifications() {
        if (this.isSignedIn) {
            devRant.clearNotifications(this.token)
        } else {
            throw new Error('Not signed in');
        }
    }

    async vote(vote: devRant.VoteState, rantId: number) {
        const response = await devRant.vote(vote, rantId, this.token);
        return response.rant;
    }

    async voteComment(vote: devRant.VoteState, commentId: number) {
        const response = await devRant.voteComment(
            vote,
            commentId,
            this.token
        );
        return response.comment;
    }

    /**
     * Resolve a specific rant by it's `id`.
     * @param randId
     */
    async getRant(randId: number) {
        return devRant.rant(randId, this.token);
    }

    async getComment(commentId: number) {
        return devRant.comment(commentId, this.token);
    }

    /**
     * Resolve multiple rants from the feed.
     * @
     * @param sort
     * @param limit
     * @param skip
     */
    async getFeedRants(sort: devRant.Sort, limit: number, skip: number) {
        return devRant.rants(sort, limit, skip, null, this.token);
    }

    /**
     * postComment is a middle way service - no images for now
     * @param rantId
     * @param comment
     * @param token
     */
    async postComment(
        rantId: number,
        comment: string,
        image: File | Blob
    ) {
        return devRant.postComment(rantId, comment, image, this.token);
    }
}
