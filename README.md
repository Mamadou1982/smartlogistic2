# SmartCI — Plateforme Logistique Intelligente 🇨🇮

> ERP de gestion logistique · Commandes, Livreurs, Stocks, Paiements Mobile Money

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EE4B6A)

---

## 🚀 Démarrage rapide

```bash
# 1. Cloner le repo
git clone https://github.com/votre-username/smartci.git
cd smartci

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
# → http://localhost:3000
```

**Compte démo :** `admin@smartci.ci` / `Admin@2026`

---

## ✨ Fonctionnalités

| Module | Fonctionnalités |
|---|---|
| **Dashboard** | Stats globales · tableau des commandes · suivi GPS |
| **Commandes** | Créer · modifier statut · détail complet · attribution livreur auto |
| **Produits** | Catalogue · ajout produit |
| **Stocks** | Niveaux · alertes stock faible |
| **Livreurs** | Gestion · zones · disponibilité · suppression |
| **Paiements** | Orange Money · MTN Money · Wave · Moov Money |
| **Statistiques** | Analytics hebdo/mensuel/annuel · performance · résumé financier |
| **Support** | Centre d'assistance |

---

## 🏗️ Structure du projet

```
smartci/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── constants.js      ← Données initiales & constantes
│   ├── hooks/
│   │   └── useSmartCI.js     ← Tout l'état & la logique métier
│   ├── App.jsx               ← Composant principal (UI)
│   ├── main.jsx              ← Point d'entrée React
│   └── index.css             ← Tailwind CSS
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 📦 Scripts

```bash
npm run dev      # Dev server (port 3000)
npm run build    # Build production → /dist
npm run preview  # Prévisualiser le build
npm run lint     # ESLint
```

---

## 🌍 Déploiement

**Vercel**
```bash
npx vercel --prod
```

**Netlify**
```bash
npm run build
# Glisser /dist sur netlify.com
```

---

## 📄 Licence

MIT © SmartCI 2026
