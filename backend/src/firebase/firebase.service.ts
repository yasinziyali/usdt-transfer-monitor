import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccount = require(
  path.resolve(process.cwd(), process.env.FIREBASE_KEY_PATH!)
);

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
  
  private tokens : Set<string> = new Set();
  
  // Frontend'den gelen FCM token'ı saklar
  setToken(token: string) {
    this.tokens.add(token);
  }

  // Aktif tüm cihaz token'larını döndürür
  getToken() {
    return Array.from(this.tokens);
  }

  // Firebase Cloud Messaging ile frontend'e real-time bildirim gönderir
  async sendLargeTransfer(data: any) {
    const tokens = this.getToken();

    // Hiç token yoksa gönderim yapılmaz
    if (tokens.length == 0) {
      return;
    }

    // Her kayıtlı cihaza ayrı ayrı notification gönderilir
    for (const token of tokens) {
      await admin.messaging().send({
        token,
        data: {
          sender: data.sender,
          receiver: data.receiver,
          amount: String(data.amount),
          txHash: data.txHash ,
        }
      });
    }
  }
}