importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
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