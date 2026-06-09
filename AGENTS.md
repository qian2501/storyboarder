# AGENTS.md

## Build & Dev

```bash
npm install        # `legacy-peer-deps=true` is in .npmrc — do not remove it
npm start          # runs webpack watch (2 windows) + electron in parallel
npm run build      # webpack production build (only language-preferences + print-project)
```

- **Most of the app runs directly from `src/js/` via Electron** — no webpack for the main window or main process.
- Only `language-preferences` and `print-project` windows are webpack-bundled into `src/build/`.

## Testing

```bash
npm test
```
- Tests use **mocha** (non-renderer), **electron-mocha --renderer** (renderer tests), and **electron-mocha** (main process tests).
- **The test command uses Unix `find`** — it will fail on Windows as-is. Test files are under `test/`.
- Test fixtures: `test/fixtures/` (`.storyboarder` files).

## Lint & Typecheck

**None configured.** This is plain JavaScript (Babel-transpiled). No ESLint, no TypeScript, no formatting tool.

## Architecture

```
src/js/main.js                          → Electron main process entry
src/js/window/main-window.js            → Main renderer (~7000 lines; React + Redux + Canvas)
src/js/main/menu.js                     → Application menu (xstate state machine)
src/js/window/storyboarder-sketch-pane.js → Canvas drawing surface
src/js/shared/store/configureStore.js   → Redux store (uses electron-redux for main↔renderer sync)
src/js/shared/reducers/                 → Redux reducers
src/js/prefs.js                         → User preferences (reads/writes JSON to userData)
```

- **Not a monorepo** — single Electron app.
- Drawing is custom HTML Canvas (paper.js is a dependency but unused for drawing).
- State: Redux 4 + xstate + electron-redux (cross-process sync).
- UI: React 16, plain CSS.
- i18n: i18next (locales in `src/js/locales/` — en-US, zh-CN, ru-RU).
- File format: `.storyboarder`.

## Quirks & Gotchas

- **`legacy-peer-deps=true`** in `.npmrc` is required for `npm install`. Do not delete or override.
- **Windows: do NOT build with npm installed inside WSL.**
- **Two vendored local dependencies** at `./src/js/vendor/tether-drop` and `./src/js/vendor/tether-tooltip` — referenced in package.json as local paths. Modified from upstream to fix a tooltip bug.
- `alchemancy` is from GitHub (`github:wonderunit/alchemancy#38c4670`), not the npm registry.
- `src/build/` and `dist/` are gitignored.
- No CI/CD, no pre-commit hooks.
- macOS builds skip notarization (`npm run dist:mac` sets hardenedRuntime but `afterSign` notarization is a no-op for this fork).
- Auto-updater only activates when `isDev` is false (production builds).
- Developer notes with Docker cross-build instructions are in `DEVELOPERS.md`.
