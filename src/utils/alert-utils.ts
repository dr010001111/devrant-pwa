export function alert(opts: Partial<HTMLIonAlertElement>) {
    const alertElement = document.createElement(
        'ion-alert'
    ) as HTMLIonAlertElement;

    Object.assign(alertElement, opts);

    document.body.append(alertElement);
    alertElement.present();
    return alertElement;
}

export function presentGenericAlert(message, header?) {
    return alert({
        message,
        header,
        buttons: ['OK'],
    });
}

export function fetchFailedAlert(message = 'Unable to load content.') {
    return presentGenericAlert(message, 'Fetch failed');
}
