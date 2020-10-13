let worker: ServiceWorker;

export async function getWorker() {
    if(worker) {
        return worker;
    }
    try {
        const registration = await navigator.serviceWorker.ready
        worker = registration.active
        return worker
    } catch (e) {
        console.error(e)
    }
}