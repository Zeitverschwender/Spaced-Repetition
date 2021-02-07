import { Link } from "react-router-dom";//todo I believe this shouldn't be here (added for testing)

function receivePushNotification(event) {
    const { image, tag, url, title, text } = event.data.json();

    const options = {
      data: url,
      body: text,
      icon: image,
      vibrate: [200, 100, 200],
      tag: tag,
      image: image,
      badge: "/favicon.ico",
      actions: [{ action: 'Accept', title: "Accept" },
                { action: 'Reject', title: "Reject" }]
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }

  function openPushNotification(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data));
    if (event.action === 'Reject') {
      
    }else{
      
    }
  }

  self.addEventListener("push", receivePushNotification);
  self.addEventListener("notificationclick", openPushNotification);