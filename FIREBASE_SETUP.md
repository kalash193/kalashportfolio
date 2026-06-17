# Firebase Setup Guide for Kalash Portfolio

## Step 1 — Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it (e.g. `kalash-portfolio`)
3. Disable Google Analytics (optional) → **Create project**

## Step 2 — Enable Firestore

1. In the Firebase console, go to **Firestore Database**
2. Click **Create database** → choose **Start in test mode** (for dev)
3. Select a region closest to you (e.g. `asia-south1` for India) → **Enable**

## Step 3 — Enable Authentication

1. Go to **Authentication** → **Get started**
2. Click **Sign-in method** → enable **Email/Password**
3. Go to **Users** tab → **Add user**
   - Email: `kalash@admin.com` (or any email you prefer)
   - Password: choose a strong password
4. Save — this will be your admin login credential

## Step 4 — Get Firebase Config

1. Go to **Project Settings** (gear icon) → **General**
2. Under **Your apps**, click **</>** (Web app) → Register app
3. Copy the `firebaseConfig` object

## Step 5 — Paste Config into the Project

Open `src/environments/environment.ts` and replace the placeholder values:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSy...",
    authDomain: "kalash-portfolio.firebaseapp.com",
    projectId: "kalash-portfolio",
    storageBucket: "kalash-portfolio.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
  }
};
```

Do the same in `src/environments/environment.prod.ts`.

## Step 6 — Firestore Security Rules (Production)

In the Firebase console → Firestore → **Rules**, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public portfolio data — read by anyone, write only by authenticated admin
    match /portfolio/data {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7 — Install & Run

```bash
npm install
ng serve
```

Admin login: go to `/#/admin/login` and use the Firebase Auth email/password you created in Step 3.

## Data Flow

- **Public portfolio page** → reads from Firestore `portfolio/data` in real-time
- **Admin panel** → authenticates via Firebase Auth, then writes to Firestore
- Changes in the admin panel are **live** — the public page updates instantly
