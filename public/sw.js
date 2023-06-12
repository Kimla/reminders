self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("sw-cache").then(function (cache) {
            return cache.add("index.php");
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

(() => {
    "use strict";

    const WebPush = {
        init() {
            self.addEventListener("push", this.notificationPush.bind(this));
            self.addEventListener(
                "notificationclick",
                this.notificationClick.bind(this)
            );
            self.addEventListener(
                "notificationclose",
                this.notificationClose.bind(this)
            );
        },

        /**
         * Handle notification push event.
         *
         * https://developer.mozilla.org/en-US/docs/Web/Events/push
         *
         * @param {NotificationEvent} event
         */
        notificationPush(event) {
            if (
                !(
                    self.Notification &&
                    self.Notification.permission === "granted"
                )
            ) {
                return;
            }

            // https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData
            if (event.data) {
                event.waitUntil(this.sendNotification(event.data.json()));
            }
        },

        /**
         * Handle notification click event.
         *
         * https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick
         *
         * @param {NotificationEvent} event
         */
        notificationClick(event) {
            // console.log(event.notification)

            if (event.action === "some_action") {
                // Do something...
            } else {
                self.clients.openWindow("/");
            }
        },

        /**
         * Handle notification close event (Chrome 50+, Firefox 55+).
         *
         * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onnotificationclose
         *
         * @param {NotificationEvent} event
         */
        notificationClose(event) {
            self.registration.pushManager
                .getSubscription()
                .then((subscription) => {
                    if (subscription) {
                        this.dismissNotification(event, subscription);
                    }
                });
        },

        /**
         * Send notification to the user.
         *
         * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
         *
         * @param {PushMessageData|Object} data
         */
        sendNotification(data) {
            return self.registration.showNotification(data.title, data);
        },

        /**
         * Send request to server to dismiss a notification.
         *
         * @param  {NotificationEvent} event
         * @param  {String} subscription.endpoint
         * @return {Response}
         */
        dismissNotification({ notification }, { endpoint }) {
            if (!notification.data || !notification.data.id) {
                return;
            }
        },
    };

    WebPush.init();
})();
