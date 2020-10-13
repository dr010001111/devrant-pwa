import { Injectable } from "@angular/core";
import debug from 'debug';

const log = debug('dr:service:config');

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor() {
        log('init');
    }
}
