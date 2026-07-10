# MIB Chat Dark - Clone WhatsApp Admin Only

Application de messagerie moderne avec Next.js, Tailwind CSS et LiveKit pour les appels.

## Fonctionnalités
- **Mode Sombre** : Design inspiré de WhatsApp Web Dark.
- **Contrôle Admin** : Seul l'administrateur peut ajouter ou supprimer des contacts.
- **Messagerie** : Chat en temps réel (Prêt pour Supabase).
- **Appels & Vidéo** : Intégration LiveKit pour une qualité professionnelle.

## Installation
1. `npm install`
2. Configurez vos variables d'environnement dans `.env.local` :
   ```env
   NEXT_PUBLIC_LIVEKIT_URL=wss://votre-url-livekit
   LIVEKIT_API_KEY=votre-cle
   LIVEKIT_API_SECRET=votre-secret
   ```
3. `npm run dev`

## Déploiement
- **GitHub** : Poussez ce code sur votre repo `MIB`.
- **Render** : Connectez le repo, utilisez `npm run build` and `npm start`.
- **Netlify** : Idem, configurez les variables d'environnement dans le dashboard.

## Restrictions Admin
La logique est gérée dans `src/app/page.tsx`. Pour la production, connectez `isAdmin` à votre service d'authentification (ex: Supabase Auth metadata).
