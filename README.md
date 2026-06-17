# Kalash Date — Portfolio + Admin Panel

Built with **Angular 17** · **TypeScript** · **Bootstrap 5** · **Bootstrap Icons**

## 🚀 Setup (One Time)

```bash
# 1. Install Node.js from https://nodejs.org (LTS version)

# 2. Open terminal in this folder
cd kalash-portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm start

# 5. Open in browser
# http://localhost:4200
```

## 🔐 Admin Panel

Visit: `http://localhost:4200/#/admin`

**Default credentials:**
- Username: `kalash`
- Password: `admin@123`

> To change credentials, edit `src/app/services/auth.service.ts` (ADMIN_USER and ADMIN_PASS)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Portfolio sections
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── education/
│   │   ├── contact/
│   │   └── footer/
│   ├── admin/               # Admin panel
│   │   ├── admin-login/
│   │   ├── admin-layout/
│   │   ├── admin-dashboard/
│   │   ├── admin-hero/
│   │   ├── admin-about/
│   │   ├── admin-skills/
│   │   ├── admin-experience/
│   │   ├── admin-projects/
│   │   └── admin-education/
│   ├── services/
│   │   ├── portfolio.service.ts   # All data + localStorage
│   │   └── auth.service.ts        # Admin login
│   └── guards/
│       └── auth.guard.ts
└── styles.css
```

## ✏️ How to Edit Content

1. Go to `http://localhost:4200/#/admin`
2. Login with your credentials
3. Click any section from the sidebar
4. Edit fields and click **Save Changes**
5. Go back to portfolio to see changes instantly

## 🏗️ Build for Production

```bash
npm run build
# Output: dist/kalash-portfolio/
# Deploy the dist folder to Netlify / Vercel / GitHub Pages
```

## 🌐 Deploy to Netlify (Free)

1. Run `npm run build`
2. Drag the `dist/kalash-portfolio/browser/` folder to netlify.com/drop
3. Done! Your portfolio is live.

## 🎨 Customize Colors

Edit the CSS variables in component styles or `src/styles.css`:
- Primary: `#6c63ff` (purple)
- Accent: `#a29bfe` (light purple)
- Background: `#0a0a14` (dark)
