# Miau

Le projet **Miau** est une application mobile native développée pour les agents de la Métropole de Lyon. Son objectif est de simplifier et de sécuriser la collecte de données sur le terrain en permettant une liaison directe entre la saisie d'informations et l'outil de gestion de données **Grist**.

L'application répond aux enjeux de modernisation des processus métropolitains à travers trois fonctionnalités clés :
* **Espace de création dédié :** Une interface de connexion permettant aux agents d'accéder à leurs formulaires métiers personnalisés.
* **Numérisation intelligente :** L'intégration d'un module de scan haute performance (`react-native-document-scanner-plugin`) pour capturer des justificatifs avec détection automatique des bords.
* **Synchronisation Grist :** L'envoi automatisé des données et des pièces jointes vers l'API Grist, créant instantanément une ligne documentée dans la table concernée.


##  Stack Technique

* **Framework :** [React Native](https://reactnative.dev/) avec [Expo](https://expo.dev/) (Managed Workflow & Expo Router).
* **Scan de documents :** `react-native-document-scanner-plugin` (Module natif).
* **Stockage local :** `react-native-mmkv` pour une persistance rapide des données.
* **Gestion d'état :** `Zustand`.
* **DataBase :** API REST [Grist](https://getgrist.com/).



##  Configuration (Variables d'environnement)

L'application utilise le système de variables d'environnement natif d'Expo. Créez un fichier `.env` à la racine du projet. 

> **Important :** Les variables doivent impérativement commencer par `EXPO_PUBLIC_` pour être accessibles via `process.env` et injectées dans le bundle JavaScript `.

```env 

# Clé API de l'agent ou du service
EXPO_PUBLIC_GRIST_API_KEY=votre_cle_api

# ID du document Grist cible
EXPO_PUBLIC_GRIST_DOC_ID=votre_doc_id

# Host de l'instance
EXPO_PUBLIC_GRIST_HOST=grist.projets.votre_host_name

```

##  Installation & Développement

L'utilisation de modules natifs (MMKV, Scanner) nécessite un **Development Client**.  
Ce workflow permet de compiler l'application via le cloud d'Expo (**EAS**), sans installation locale d'Android Studio.

### Pré-requis
```bash

- Un compte sur expo.dev
- CLI EAS installé : npm install -g eas-cli

# 1. Installation des dépendances
npm install

# 2. Connexion à votre compte Expo
npx expo login

# 3. Génération du Client de Développement (Android). Cette commande crée l'APK natif sur les serveurs d'Expo.
eas build --profile development --platform android

# 4. Lancement du serveur de développement
npx expo start
```

Une fois le build terminé, installez l'APK sur votre appareil Android.  
Lancez ensuite le serveur et ouvrez l'application **Miau** pour charger votre code.



##  Architecture du Projet

```
app/        → Routes, pages et navigation (Expo Router)
components/ → Composants UI réutilisables
lib/        → Configuration de l'instance MMKV
store/      → Gestion de l'état global (Zustand)
utils/      → Fonctions logiques et API (getGrist, sendToGrist, scanDoc)
```

##  Profils de Build (eas.json)

### development
Génère un client de développement (`developmentClient: true`) pour le debug.

### preview
Distribution interne (APK de test).

### production
Version finale optimisée pour le déploiement.

