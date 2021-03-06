import { Injectable } from '@angular/core';
import debug from 'debug';

const log = debug('dr:service:config');
const CONFIG_KEY = 'drAppConfiguration';

/**
 * Signature for configurtion with default value set.
 * @see ConfigService constructor
 */
class AppConfiguration {
    // if it's any other string than listed below, it should be an hex.
    scheme: 'auto' | 'light' | 'dark' | 'devrant-dark' | string = 'auto';
    theme: 'default' | 'win98' = 'default';
    'notifications:simple' = false;
}

// signature for correct class properties exposure
type IAppConfiguration = AppConfiguration;

@Injectable({
    providedIn: 'root',
})
export class ConfigService implements IAppConfiguration {
    /**
     * List(s) of function that are to-be-called
     * whenever the matching key as propertyName has been updated.
     * NOTE: Also immediately fired are registration
     */
    _listeners: { [key: string]: Function[] } = {};

    constructor() {
        const self = this;

        const existingConfig = JSON.parse(localStorage.getItem(CONFIG_KEY));
        var _configuration = { ...new AppConfiguration(), ...existingConfig };

        Object.keys(_configuration).forEach(
            (configName: keyof AppConfiguration) => {
                Object.defineProperty(this, configName, {
                    get() {
                        return _configuration[configName];
                    },

                    set(value) {
                        const oldValue = _configuration[configName];
                        _configuration[configName] = value;
                        self.persistLazy(_configuration);
                        self.runListenerLazy(configName, oldValue);
                    },
                });
            }
        );

        log('init');
    }
    'notifications:simple': boolean;
    scheme: 'auto' | 'light' | 'dark' | 'devrant-dark' | string;
    [key: string]: unknown;
    theme: 'default' | 'win98';

    registerRunner(
        listenOn: keyof AppConfiguration,
        callback: (newValue, oldValue) => any
    ) {
        const hasRunners = this._listeners[listenOn];

        if (hasRunners) {
            hasRunners.push(callback);
        } else {
            this._listeners[listenOn] = [callback];
        }
        callback(this[listenOn], null);
    }

    private async runListenerLazy(
        configName: keyof AppConfiguration,
        oldValue: unknown
    ) {
        const runners = this._listeners[configName];
        if (runners && runners.length) {
            log(`exec ${runners.length} runners for ${configName}`);
            runners.forEach((runner) => runner(this[configName], oldValue));
        }
    }

    private async persistLazy(newConfig: AppConfiguration) {
        const json = JSON.stringify(newConfig);
        localStorage.setItem(CONFIG_KEY, json);
    }
}
