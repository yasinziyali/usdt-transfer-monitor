"use client";
import { useEffect, useState } from "react";
import { initFCM } from "@/lib/firebase";

export default function Home() {
  const [alerts, setAlerts] = useState<any[]>([]);
  
// Sayfa açıldığında FCM setup ve message listener başlatılır

  useEffect(() => {
  const setup = async () => {
    const token = await initFCM();
    
    if (!token) return;

    await fetch("http://localhost:3000/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  };
  // FCM token oluşturulur ve backend'e gönderilir
  setup();

  if (typeof window !== "undefined") {
    import("firebase/messaging").then(({ getMessaging, onMessage }) => {
      const messaging = getMessaging();
      
      // Gelen FCM mesajlarını yakalar
      onMessage(messaging, (payload) => {
        const data = payload.data;

      // Gelen event UI'a alert olarak eklenir
        if (!data) return;
        const alert = {
          from: data.sender,
          to: data.receiver,
          amount: data.amount,
          txHash: data.txHash,
          time: new Date().toLocaleTimeString()
        };
        setAlerts((prev) => [alert, ...prev]);
      });
    });
  }
  }, []);
  
  // Kullanıcın göreceği kısmın düzenlenmesi

  return (
  <div className="min-h-screen bg-black text-white p-6">
    
    {/* HEADER */}
    <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
      📊 High Value Transfers | 100K+ USDT
    </h1>

    {/* CONTENT */}
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <p className="text-gray-500 italic">Waiting for transfers...</p>
      ): 

    // Gerçek zamanlı gelen büyük USDT transferlerinin listelenmesi
      
        (alerts.map((a, i) => (
          <div
            key={i}
            className="p-5 bg-zinc-900 rounded-xl border border-zinc-700 hover:border-zinc-500 transition">
    
            {/* FROM / TO */}
            <div className="text-sm text-gray-300 space-y-1 mb-3 font-mono">
              <p>
                <span className="text-gray-400">From:</span>{" "}
                <span className="text-gray-100">{a.from}</span>
              </p>
              <p>
                <span className="text-gray-400">To:</span>{" "}
                <span className="text-gray-100">{a.to}</span>
              </p>
            </div>

            {/* AMOUNT */}
            <p className="text-lg font-bold text-emerald-600 mb-2">
              {Number(a.amount).toFixed(2)} USDT
            </p>

            {/* HASH */}
            <p className="text-sm text-gray-300 font-mono break-all">
              <span className="text-gray-400">Hash:</span>{" "}
              <span className="text-gray-100">{a.txHash}</span>
            </p>

            {/* TIME */}
            <p className="text-xs text-gray-300 mt-2">
              {a.time}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
  );
}