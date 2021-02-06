/**
 * checks if Push notification and service workers are supported by your browser
 */
function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
async function askUserPermission() {
  return await Notification.requestPermission();
}
/**
 * shows a notification
 */
function sendNotification() {

  const img = "./src/assets/images/repeat.svg";
  const text = "You got a notification!";
  const title = "GET NOTIFIED";
  const options = {
    body: text,
    icon: "/favicon.ico",
    vibrate: [200, 100, 200],
    tag: "test",
    image: img,
    badge: "/favicon.ico",
    actions: [{ action: "Accept", title: "Accept" },
              { action: "Reject", title: "Reject" }]
  };
  navigator.serviceWorker.ready.then(function(serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
}

/**
 *
 */
function registerServiceWorker() {
  return navigator.serviceWorker.register("/sw.js");
}

export {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  sendNotification
};