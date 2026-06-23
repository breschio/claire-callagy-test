# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static photography portfolio for Claire Callagy (Martha's Vineyard). Plain HTML/CSS/vanilla JS — no framework, no build step, no bundler. Deployed via GitHub Pages to the custom domain in `CNAME` (clairecallagy.com); pushing to `main` publishes the site.

`package.json` lists `linearicons` and `react-social-icons`, but **neither is used at runtime** — icons come from CDNs (Linearicons CSS, Google Fonts, GSAP) loaded directly in the HTML `<head>`. There is nothing to `npm install` to develop.

## Running locally

Pages use `fetch()` to inject shared HTML (see Menu injection below), so opening files via `file://` breaks the menu. Serve over HTTP from the repo root:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

There are no tests, linters, or build commands.

## Architecture

Each page is a standalone `.html` file (`index.html`, `soundings.html`, `lifestyle.html`, `about.html`) that hand-includes the CSS and JS it needs in `<head>`. There is no shared layout template — navigating between pages is full page loads, and each page re-runs all its scripts from scratch.

**Page types:**
- **Home (`index.html`)** — a full-bleed splash. The whole viewport is one `<a href="soundings.html">` wrapping a muted, looping, autoplay background `<video>` (vertical clips in `videos/*.mp4`) with the centered white "CLAIRE CALLAGY" wordmark over it. No menu, no other scripts — clicking anywhere enters the site at SOUNDINGS. Styles are the `.splash*` rules at the bottom of `base.css`.
- **SOUNDINGS (`soundings.html`)** — the primary gallery: a minimal horizontal **carousel** (Swiper.js, loaded from CDN) of single and paired images in a deliberate, hardcoded order, one group per `.swiper-slide`. Each slide is full-width with the image(s) centered at a fixed height (~80vh); `.soundings-pair` holds the two images of a pair side by side. Click left/right half to go prev/next (plus swipe + arrow keys); no autoplay; loops. `js/soundings.js` inits Swiper and drives the live caption (from each slide's `data-caption`) and the `N/11` counter; `css/soundings.css` is the layout. Deep-link a group with `soundings.html#<n>`. No lightbox here — the carousel is the viewer.
- **LIFESTYLE (`lifestyle.html`)** — a `.masonry-layout` grid of `.masonry-item` images that fade in sequentially (`js/app.js` + `js/masonry.js`).
- **About (`about.html`)** — static text + contact.

**Menu injection** (`js/components.js` + `js/menu.js` + `components/menu.html`): `components.js` fetches `components/menu.html` and prepends it to `<body>` on DOMContentLoaded, then calls `initializeMenu()` (defined in `menu.js`) to wire the hamburger toggle and mark the current page (`aria-current` + `.current`). To change nav links, edit `components/menu.html` — it is the single source for navigation. The splash homepage does **not** inject the menu (no script includes). The menu has two responsive forms: `.nav-desktop` (inline links top-right, shown ≥1024px) and `.nav` (the hamburger + `.mobile-menu` overlay, shown <1024px); the CSS swap and the `.page-header` section-title hide live in the `@media (min-width: 1024px)` block in `base.css`. The hamburger is a clean three-`<span>` flex toggle (don't reintroduce the old `.nav-line` pseudo-element version — it didn't size reliably).

**Lightbox** (`js/lightbox.js`): a single `Lightbox` class instantiated on every page that includes it (LIFESTYLE; not SOUNDINGS, which uses the carousel). On init it binds click handlers to `.masonry-item img` and `.gallery-image img`. Clicking opens a fullscreen overlay scoped to the clicked image's `data-category` group, with prev/next, keyboard arrows, Escape, touch-swipe, and dot indicators.

**Image conventions**: the masonry pages use `images/<category>/<category>-N.jpg` (e.g. `images/lifestyle/lifestyle-1.jpg`); `js/app.js` parses the trailing number from the `src` to order fade-ins, so those filenames must keep the `-N` suffix. SOUNDINGS uses descriptive kebab-case names under `images/soundings/` (e.g. `shallow-waters.jpg`). In all cases the image list and caption text are hardcoded in the HTML, not generated — to add/remove images, edit both the file on disk and the markup.

**SOUNDINGS captions**: each `<figcaption>` follows the brief's "Capital then lowercase" form plus the print size, e.g. `Shallow Waters, 15x20"`.

## Styling

CSS is split by concern under `css/`: `base.css` (layout, nav, splash, footer, theme), `typography.css`, `masonry.css`, `soundings.css`, `lightbox.css`. Design tokens (colors, transition curves) are CSS custom properties in `:root` at the top of `base.css`. A `theme-dark` body class and dark-mode tokens exist but `theme-light` is hardcoded on `<body>` everywhere. Overlay text (`.gallery-info`, `.page-header`, `.site-footer`, nav) uses `mix-blend-mode: difference` to stay legible over photos. The site font is **Libre Franklin** (Google Fonts, variable 100–900), set in `typography.css` and the splash/menu rules in `base.css`.

## Gotchas

- `about.html` calls `copyToClipboard(...)` on the email link, but that function is not defined anywhere in the JS — the click is a no-op. Define it if email-copy is needed.
- `js/loading.js` and `js/gallery.js` exist but are no longer referenced by any page (leftovers from the v1 slideshow home); the active masonry fade-in logic is in `js/app.js`.
- SOUNDINGS images are committed at full resolution (e.g. `aquinnah.jpg` is ~14MB / 10344px wide) — the page is asset-heavy and a downsizing pass is worthwhile before launch.
- `videos/` holds web-encoded MP4s only; source `.MOV` files are gitignored. `node_modules/` is also gitignored but still present locally.
</content>
</invoke>
