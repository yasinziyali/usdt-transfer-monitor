importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDfsnZ3Wqqw_Se3HAJp6v3qXMiqf4P0-2M",
  authDomain: "usdt-alert-system.firebaseapp.com",
  projectId: "usdt-alert-system",
  messagingSenderId: "89194579566",
  appId: "1:89194579566:web:30696d49f87bfe1a37887f"
});

// Uygulama kapalıyken gelen FCM mesajlarını işler

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const amount = payload?.data?.amount;

  self.registration.showNotification("📊 High Value Transfer Alert", {
    body: amount
      ? `💸 ${Number(amount).toFixed(2)} USDT`
      : "No Amount",
  });
});