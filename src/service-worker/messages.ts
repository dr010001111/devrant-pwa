import { Notifications, Token } from 'ts-devrant';

export type MessageKinds =
    | NewTokenMessage
    | SetApiRequest
    | ForceUpdateNotifcationsRequest
    | NotificationsChange
    | NotificationsChecked;

export interface NotificationsChange {
    type: 'notifications';
    notifications: Notifications;
}

export interface SetApiRequest {
    type: 'setAPI';
    apiURL: string;
}

export interface ForceUpdateNotifcationsRequest {
    type: 'forceUpdateNotifs';
}

export interface NotificationsChecked {
    type: 'notifsChecked';
}

export interface NewTokenMessage {
    type: 'newToken';
    token: Token;
}
