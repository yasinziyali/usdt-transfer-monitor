<h1 align="center" style="font-weight: bold;">USDT Transfer Monitoring System 💸</h1>
<p align="center">

<img src="https://img.shields.io/badge/Backend-NestJS-red?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Blockchain-Ethereum-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Realtime-Firebase-orange?style=for-the-badge"/>

</p>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#env">Environment</a> •
 <a href="#architecture">Architecture</a> •
 <a href="#features">Features</a> •
 <a href="#demo">Demo</a> •
 <a href="#notes">Notes</a> •
 <a href="#status">Status</a>
</p>

<p align="center">
    <b>
    A fullstack real-time monitoring system that listens Ethereum mainnet USDT transfers and sends Firebase push notifications when large transfers occur (≥ 100,000 USDT).
    </b>
</p>

---

<h2 id="tech">💻 Technologies</h2>

### Backend
- NestJS
- Ethers.js
- Firebase Admin SDK
- TypeScript
- Ethereum Mainnet (Alchemy RPC)

### Frontend
- Next.js
- Firebase Cloud Messaging (FCM)
- TypeScript

---

<h2 id="started">🚀 Getting started</h2>

### Prerequisites
- Node.js
- npm
- Git

---

### Cloning

```bash
git clone https://github.com/yasinziyali/usdt-transfer-monitor.git
cd usdt-transfer-monitor
```

---

### Installation

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

### Running the project

#### Backend
```bash
cd backend
npm run start
```

#### Frontend
```bash
cd frontend
npm run dev
```

---

<h2 id="env">🔐 Environment Variables</h2>

### Backend `.env`

This project requires sensitive configuration values to run properly.  
For security reasons, sensitive files such as `.env` and Firebase service account credentials are **not included** in the repository.

You must manually create a `.env` file inside the `backend/` directory using the structure below:

```env
ALCHEMY_RPC_URL=your_alchemy_rpc_url
FIREBASE_KEY_PATH=./your-firebase-admin-key.json
```

---

### Firebase Admin SDK Setup

This project also requires a Firebase Admin SDK private key JSON file.

#### Generate Firebase Service Account Key

1. Open Firebase Console
2. Go to **Project Settings**
3. Navigate to **Service Accounts**
4. Click **Generate new private key**
5. Download the generated JSON file

Place the downloaded JSON file inside the `backend/` directory.

Example project structure:

```text
backend/
│── .env
│── your-firebase-admin-key.json
│── src/
```

The `.env` file should reference the JSON file correctly:

```env
FIREBASE_KEY_PATH=./your-firebase-admin-key.json
```

---

### Alchemy RPC Setup

1. Create an account on Alchemy
2. Create a new Ethereum Mainnet application
3. Copy your HTTPS RPC URL
4. Paste it into the `.env` file:

```env
ALCHEMY_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

---

<h2 id="architecture">🏗 Architecture</h2>

```text
⚡ SYSTEM FLOW

🟣 Ethereum Mainnet
        ↓
🟡 NestJS Event Listener (Ethers.js)
        ↓
🔴 Filter Engine (≥ 100k USDT)
        ↓
🟠 Firebase Cloud Messaging (FCM)
        ↓
🟢 Next.js Frontend UI
```

---

<h2 id="features">✨ Features</h2>

✔ Real-time USDT transfer monitoring  
✔ Ethereum mainnet event listening  
✔ Transaction details include sender, receiver, amount and transaction hash  
✔ High-value transaction detection (≥ 100k USDT)  
✔ Firebase push notification system  
✔ Frontend live notification UI  

---

<h2 id="demo">📸 Demo / System Output</h2>

Below is a real example of the system in action.  
The application successfully detects high-value USDT transfers and displays real-time notifications on the frontend.

<p align="center">
  <img src="assets/demo.png" alt="USDT Monitoring System Demo" width="800" style="border-radius:10px;"/>
</p>

> Live demonstration of real-time USDT transfer detection and Firebase push notifications.


<h2 id="notes">📌 Notes</h2>

- Contract Address:
```
0xdAC17F958D2ee523a2206206994597C13D831ec7
```

- Only transfers ≥ 100,000 USDT are processed
- Proper USDT decimal handling (6 decimals)
- Firebase is used for real-time push notifications

---

<h2 id="status">📊 Project Status</h2>

✔ Completed as a fullstack technical assessment task  
✔ Backend + Frontend integrated  
✔ Real-time blockchain monitoring active

---

> This project was developed as part of a fullstack technical assessment focused on real-time blockchain event processing.