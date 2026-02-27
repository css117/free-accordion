# free-accordion — Note de workflow

## Repo GitHub
https://github.com/css117/free-accordion

---

## Prérequis (déjà installés)
- **Node.js** v24+ et **npm** v11+
- **Git** v2.53+
- **Token GitHub** — à renouveler tous les 90 jours :
  GitHub → avatar → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token (classic)
  Cocher uniquement **repo**, durée 90 jours.

---

## Première installation sur une nouvelle machine

```bash
git clone https://github.com/css117/free-accordion.git
cd free-accordion
npm install
npm run build
```

Puis déposer le dossier `free-accordion/` dans `wp-content/plugins/` (sans `node_modules/`).

---

## Workflow quotidien

### 1. Modifier le code
Éditer les fichiers dans `blocks/free-accordion/` ou `blocks/free-accordion-item/`.

### 2. Compiler
```bash
npm run build
```
ou en mode watch pendant le développement (recompile à chaque sauvegarde) :
```bash
npm run start
```

### 3. Tester dans WordPress
Copier / uploader le dossier mis à jour dans `wp-content/plugins/`.

### 4. Pousser sur GitHub
```bash
git add .
git commit -m "Description courte de ce qui a changé"
git push
```

---

## Renouveler le token GitHub (tous les 90 jours)

1. Générer un nouveau token sur GitHub (voir Prérequis)
2. Dans le dossier du plugin :
```bash
git remote set-url origin https://css117:NOUVEAU_TOKEN@github.com/css117/free-accordion.git
git push
git remote set-url origin https://github.com/css117/free-accordion.git
```
Windows Credential Manager mémorise ensuite le token automatiquement.

---

## Structure du plugin

```
free-accordion/
├── blocks/
│   ├── free-accordion/          # Bloc parent (groupe)
│   │   ├── block.json           # Déclaration du bloc
│   │   ├── index.js             # Interface éditeur Gutenberg
│   │   ├── frontend.js          # JS front-end (accordion logic)
│   │   ├── render.php           # Rendu HTML côté serveur
│   │   ├── editor.css           # Styles éditeur uniquement
│   │   └── style.css            # Styles front-end
│   └── free-accordion-item/     # Bloc fils (item)
│       ├── block.json
│       ├── index.js
│       ├── render.php
│       ├── editor.css
│       └── style.css
├── build/                       # Fichiers compilés (généré par npm run build)
├── free-accordion.php           # Point d'entrée du plugin
├── package.json                 # Dépendances et scripts npm
├── webpack.config.js            # Config de build
├── .gitignore                   # node_modules/, build/, *.zip
└── .gitattributes               # Normalisation des fins de ligne (LF)
```

---

## Installer le plugin dans WordPress

**Via l'interface WP (sans FTP) :**
1. Zipper le dossier `free-accordion/` en excluant `node_modules/` :
```bash
Compress-Archive -Path .\blocks, .\build, .\free-accordion.php, .\package.json, .\webpack.config.js, .\.gitignore, .\.gitattributes -DestinationPath ..\free-accordion-v0.1.0.zip -Force
```
2. WordPress → Extensions → Ajouter → Téléverser une extension → choisir le zip.

**Via FTP :**
Copier le dossier `free-accordion/` (avec `build/`, sans `node_modules/`) dans `wp-content/plugins/`.

---

## Utilisation dans Gutenberg

1. Insérer un bloc **Accordéon (groupe)** — lui donner une étiquette, configurer les options (exclusif, animé, boutons tout voir / tout cacher).
2. Insérer un ou plusieurs blocs **Accordéon (item)** n'importe où dans la page.
3. Dans chaque item, sélectionner le groupe parent dans le panneau latéral.
4. Remplir la zone **Toggler** (ce qu'on clique) et la zone **Contenu révélé** avec n'importe quels blocs Gutenberg.
