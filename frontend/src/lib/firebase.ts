import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDfsnZ3Wqqw_Se3HAJp6v3qXMiqf4P0-2M",
  authDomain: "usdt-alert-system.firebaseapp.com",
  projectId: "usdt-alert-system",
  storageBucket: "usdt-alert-system.firebasestorage.app",
  messagingSenderId: "89194579566",
  appId: "1:89194579566:web:30696d49f87bfe1a37887f"
};

// Firebase Cloud Messaging initialize + permission + token alma işlemi

const app = initializeApp(firebaseConfig);

export const initFCM = async () => {
  if (typeof window === "undefined") return;

  const supported = await isSupported();
  if (!supported) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permission denied");
    return;
  }
  
// FCM device token oluşturulur ve backend'e gönderilir
  const messaging = getMessaging(app);

  const token = await getToken(messaging, {
    vapidKey: "BPsFrWRttdolHv7KUMkzTph-w6TUglphiD0GMQt5iHamQLwDLCKTCEpbexNA4J21rwNipcejAHpEW_PdKtUdznE"
  });

  return token;
}
