# VNgine website

Static site for [VNgine](https://github.com/ThijssjihT/VNgine): introduction, game
portfolio, documentation and browser-based JSON generators.

No build step. Plain HTML, one stylesheet, a few small vanilla-JS files.
Open `index.html` in a browser and it works — over `file://` too.

## Layout

```
index.html              home
games/                  portfolio: index + one page per game
wiki/                   documentation, sidebar tree on every page
  authoring/            for game authors (tutorial + reference)
  code/                 code walkthrough for contributors
tools/                  JSON generators
assets/
  css/site.css          site theme (Sailfish-inspired dark)
  css/tool.css          generator-only styles
  js/sitemap.js         SINGLE SOURCE OF TRUTH for navigation
  js/nav.js             builds header, footer and the wiki tree
  js/cards.js           renders card lists on landing pages
  js/tool.js            shared generator helpers (form binding, diff, copy…)
  js/engine-defaults.js engine default styles, mirrored from the engine repo
_scaffold.py            one-off generator for skeleton pages (never overwrites)
```

Every page defines `window.SITE_BASE` (the relative path back to the site root)
before loading the scripts. That is what keeps relative links working both on
`file://` and under a GitHub Pages project path.

## Adding a page

1. Add an entry to `assets/js/sitemap.js` (nav, wiki tree, tools or games).
2. Run `python3 _scaffold.py` — it creates skeleton files for any entry that has
   no page yet and leaves existing pages untouched.
3. Write the content.

The header, the wiki tree and the landing-page card lists all follow from the
sitemap, so there is no nav markup to keep in sync.

## Adding a generator

Copy `tools/textbox.html` as a starting point. The pattern:

- describe the defaults in `assets/js/engine-defaults.js`
- mark form inputs with `data-key="dotted.path"` and `data-type="number|float|string"`
- `VNTool.bindForm(form, state, render)` wires them to a state object
- `VNTool.diff(defaults, state)` produces a minimal style block, matching how the
  engine merges a style over the engine defaults (`mergeStyle` in `GameEngine.js`)
- `VNTool.copy` / `VNTool.download` / `VNTool.wireLoaders` handle output and loading

Keep `engine-defaults.js` in sync with `qml/engine/engine_defaults/*.json` in the
engine repo.

## Deploying to GitHub Pages

Create a repo (e.g. `vngine-web`), push this folder, then in
**Settings → Pages** choose *Deploy from a branch*, branch `main`, folder `/ (root)`.
The `.nojekyll` file is already present so Jekyll does not touch the assets.

Local preview with a server (needed only if you want clean directory URLs):

```sh
python3 -m http.server 8000
```
