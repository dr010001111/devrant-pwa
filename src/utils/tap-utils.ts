interface TapCalls {
    single?: () => any;
    double?: () => any;
}

let lastTap;
let lastTapClickId;
let lastTarget;

export function tapOrDouble(
    calls: TapCalls,
    event: MouseEvent | KeyboardEvent | TouchEvent,
    wait = 160
): { clear?: () => void } {
    clearTimeout(lastTapClickId);

    const clear = () => {
        lastTap = null;
        clearTimeout(lastTapClickId);
    };

    if (event.target !== lastTarget) {
        clear();
    }

    lastTarget = event.target;

    if (event.type.match(/^key/i)) {
        if ((event as KeyboardEvent).code !== 'Enter') {
            return { clear };
        }
    }

    var timeSince = Date.now() - lastTap;
    if (timeSince && timeSince < wait) {
        if (calls.double) calls.double();
    } else {
        lastTapClickId = setTimeout(() => {
            if (calls.single) calls.single();
        }, wait);
    }

    lastTap = new Date().getTime();

    return {
        clear,
    };
}
