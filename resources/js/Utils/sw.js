import { ref } from "vue";

export const loading = ref(false);
export const isPushEnabled = ref(false);
export const pushButtonDisabled = ref(false);

export function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        console.log("Service workers aren't supported in this browser.");
        return;
    }

    navigator.serviceWorker
        .register("/sw.js")
        .then(() => initialiseServiceWorker());
}

export function initialiseServiceWorker() {
    if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
        console.log("Notifications aren't supported.");
        return;
    }

    if (Notification.permission === "denied") {
        console.log("The user has blocked notifications.");
        return;
    }

    if (!("PushManager" in window)) {
        console.log("Push messaging isn't supported.");
        return;
    }

    navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
            .getSubscription()
            .then((subscription) => {
                pushButtonDisabled.value = false;

                if (!subscription) {
                    return;
                }

                updateSubscription(subscription);

                isPushEnabled.value = true;
            })
            .catch((e) => {
                console.log("Error during getSubscription()", e);
            });
    });
}

export function subscribe() {
    navigator.serviceWorker.ready.then((registration) => {
        const options = { userVisibleOnly: true };
        const vapidPublicKey = window.Laravel.vapidPublicKey;

        if (vapidPublicKey) {
            options.applicationServerKey =
                urlBase64ToUint8Array(vapidPublicKey);
        }

        registration.pushManager
            .subscribe(options)
            .then((subscription) => {
                isPushEnabled.value = true;
                pushButtonDisabled.value = false;

                updateSubscription(subscription);
            })
            .catch((e) => {
                if (Notification.permission === "denied") {
                    console.log("Permission for Notifications was denied");
                    pushButtonDisabled.value = true;
                } else {
                    console.log("Unable to subscribe to push.", e);
                    pushButtonDisabled.value = false;
                }
            });
    });
}

export function unsubscribe() {
    navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
            .getSubscription()
            .then((subscription) => {
                if (!subscription) {
                    isPushEnabled.value = false;
                    pushButtonDisabled.value = false;
                    return;
                }

                subscription
                    .unsubscribe()
                    .then(() => {
                        deleteSubscription(subscription);

                        isPushEnabled.value = false;
                        pushButtonDisabled.value = false;
                    })
                    .catch((e) => {
                        console.log("Unsubscription error: ", e);
                        pushButtonDisabled.value = false;
                    });
            })
            .catch((e) => {
                console.log("Error thrown while unsubscribing.", e);
            });
    });
}

export function togglePush() {
    if (isPushEnabled.value) {
        unsubscribe();
    } else {
        subscribe();
    }
}

export function updateSubscription(subscription) {
    const key = subscription.getKey("p256dh");
    const token = subscription.getKey("auth");
    const contentEncoding = (PushManager.supportedContentEncodings || [
        "aesgcm",
    ])[0];

    const data = {
        endpoint: subscription.endpoint,
        publicKey: key
            ? btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
            : null,
        authToken: token
            ? btoa(String.fromCharCode.apply(null, new Uint8Array(token)))
            : null,
        contentEncoding,
    };

    loading.value = true;

    axios.post("/subscriptions", data).then(() => {
        loading.value = false;
    });
}

export function deleteSubscription(subscription) {
    loading = true;

    axios
        .post("/subscriptions/delete", { endpoint: subscription.endpoint })
        .then(() => {
            loading.value = false;
        });
}

export function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
