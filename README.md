# Free Accordion

![Version](https://img.shields.io/badge/version-0.1.0-blue) ![Licence](https://img.shields.io/badge/licence-GPL--2.0--or--later-green) ![WordPress](https://img.shields.io/badge/WordPress-6.x-informational)

Lightweight Gutenberg accordion blocks that can be **placed freely anywhere on the page**.

---

## Concept

Unlike traditional accordion plugins, **Free Accordion** does not constrain content inside a single container block. The parent block (group) and child blocks (items) can be placed **anywhere on the page** — separated by other blocks, in different columns, nested inside other structures.

Items link to their group via a stable identifier, independent of their position in the DOM.

---

## Blocks

### Free Accordion group — `free-accordion/accordion`

Defines an accordion group. Optionally generates show/hide control buttons.

**Options:**
- Group label — for editor use only, not displayed on the site
- Show all / Hide all button labels
- Collapse others — opening one item collapses the others
- Animate opening — CSS drawer effect
- Global control — buttons control all accordions on the page

### Free Accordion item — `free-accordion/accordion-item`

An item to place freely on the page, containing two editable zones:
- **Toggler** — what the user clicks to open/close
- **Revealed content** — what appears on click

Both zones accept any Gutenberg block, including other accordions.

**Options:**
- Parent group — select the group this item belongs to
- Open by default

---

## Usage

1. Insert a **Free Accordion group** block — set a label and configure options
2. Insert one or more **Free Accordion item** blocks anywhere on the page
3. In each item, select the parent group in the right sidebar
4. Fill the **Toggler** and **Revealed content** zones with any Gutenberg blocks

### Nesting

Accordions can be nested — a revealed content zone can contain another accordion group and its items. Parent group selection works at all nesting levels.

---

## Installation

### Via WordPress dashboard

Download the zip from [Releases](https://github.com/css117/free-accordion/releases) and upload via Plugins → Add New → Upload Plugin.

### Via FTP / SSH

Copy the `free-accordion/` folder (with `build/`, without `node_modules/`) into `wp-content/plugins/`.

---

## Development

### Requirements

- Node.js v20+ and npm
- Git

### Setup

```bash
git clone https://github.com/css117/free-accordion.git
cd free-accordion
npm install
npm run build
```

### Available scripts

```bash
npm run build    # compile sources
npm run start    # watch mode
npm run i18n     # generate .pot translation file
```

---

## Architecture

```
free-accordion/
├── blocks/
│   ├── free-accordion/           # Parent block
│   │   ├── block.json
│   │   ├── index.js              # Gutenberg editor (JSX)
│   │   ├── frontend.js           # Vanilla JS front-end
│   │   ├── render.php            # Server-side render
│   │   ├── editor.css
│   │   └── style.css
│   └── free-accordion-item/      # Child block
│       ├── block.json
│       ├── index.js
│       ├── render.php
│       ├── editor.css
│       └── style.css             # Loaded on front-end only (viewStyle)
├── build/                        # Compiled — do not edit
├── languages/                    # Translation files (.pot, .po, .mo)
├── free-accordion.php
├── package.json
└── webpack.config.js
```

### Technical choices

- **Stable IDs** — `groupId` generated once at block creation, never regenerated
- **Pure CSS animation** — `@keyframes` with `max-height` and `animation-fill-mode`, no JS height calculation
- **`viewStyle`** — item CSS loaded on front-end only, keeping the editor unaffected
- **PHP render** — parent group options (`animated`, `exclusive`) resolved server-side
- **Vanilla JS** — zero dependencies, event delegation on `document`

---

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/css117/free-accordion).

---

## Author

[Giboo.fr](https://giboo.fr)

## Licence

GPL-2.0-or-later — see [LICENSE](LICENSE)