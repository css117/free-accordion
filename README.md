# Free Accordion

![Version](https://img.shields.io/badge/version-0.1.0-blue) ![Licence](https://img.shields.io/badge/licence-GPL--2.0--or--later-green) ![WordPress](https://img.shields.io/badge/WordPress-6.x-informational)

Plugin WordPress Gutenberg d'accordéons légers et **librement positionnables** dans la page.

---

## Concept

Contrairement aux plugins d'accordéon classiques, **Free Accordion** ne contraint pas le contenu dans un bloc conteneur. Le bloc parent (groupe) et les blocs fils (items) peuvent être placés **n'importe où** dans la page — séparés par d'autres blocs, dans des colonnes différentes, imbriqués dans d'autres structures.

Les items se rattachent à leur groupe via un identifiant stable, indépendant de leur position dans le DOM.

---

## Les deux blocs

### Accordéon (groupe) — `free-accordion/accordion`

Définit un groupe d'accordéon. Génère optionnellement des boutons de contrôle global.

**Options :**
- Étiquette du groupe (usage éditeur uniquement)
- Libellés "Tout voir" / "Tout cacher"
- Mode exclusif — ouvrir un item ferme les autres
- Animation CSS de l'ouverture/fermeture
- Interrupteur général — contrôle tous les accordéons de la page

### Accordéon (item) — `free-accordion/accordion-item`

Un item à placer librement dans la page, contenant deux zones éditables :
- **Toggler** — ce sur quoi l'utilisateur clique
- **Contenu révélé** — ce qui apparaît au clic

Les deux zones acceptent n'importe quel bloc Gutenberg, y compris d'autres accordéons.

**Options :**
- Groupe parent — sélectionne le groupe auquel l'item est rattaché
- Ouvert par défaut

---

## Installation

### Via l'interface WordPress

Télécharger le zip depuis les [Releases](https://github.com/css117/free-accordion/releases) et uploader via Extensions → Ajouter → Téléverser.

### Via FTP / SSH

Copier le dossier `free-accordion/` (avec `build/`, sans `node_modules/`) dans `wp-content/plugins/`.

---

## Développement

### Prérequis

- Node.js v20+ et npm
- Git

### Installation

```bash
git clone https://github.com/css117/free-accordion.git
cd free-accordion
npm install
npm run build
```

### Scripts disponibles

```bash
npm run build   # compile les sources
npm run start   # compile en mode watch
```

---

## Architecture

```
free-accordion/
├── blocks/
│   ├── free-accordion/           # Bloc parent
│   │   ├── block.json
│   │   ├── index.js              # Éditeur Gutenberg (JSX)
│   │   ├── frontend.js           # JS vanilla front-end
│   │   ├── render.php            # Rendu serveur
│   │   ├── editor.css
│   │   └── style.css
│   └── free-accordion-item/      # Bloc fils
│       ├── block.json
│       ├── index.js
│       ├── render.php
│       ├── editor.css
│       └── style.css
├── build/                        # Compilé — ne pas modifier
├── free-accordion.php
├── package.json
└── webpack.config.js
```

### Choix techniques

- **IDs stables** — `groupId` généré une seule fois à la création du bloc parent
- **Animation CSS pure** — `@keyframes` avec `max-height` et `animation-fill-mode`, sans calcul JS
- **`viewStyle`** — CSS de l'item chargé uniquement en front-end
- **Rendu PHP** — options du groupe résolues côté serveur
- **JS vanilla** — zéro dépendance, délégation d'événements sur `document`

---

## Contribuer

Les issues et pull requests sont les bienvenues sur [GitHub](https://github.com/css117/free-accordion).

---

## Auteur

[Giboo](https://giboo.fr)

## Licence

GPL-2.0-or-later — voir [LICENSE](LICENSE)