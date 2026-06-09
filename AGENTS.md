# AGENTS.md

## Build & Dev

```bash
npm install        # `legacy-peer-deps=true` is in .npmrc — do not remove it
npm start          # runs Vite watch (2 windows) + electron in parallel
npm run build      # Vite production build (only language-preferences + print-project)
```

- **Most of the app runs directly from `src/js/` via Electron** — no bundler for the main window or main process.
- Only `language-preferences` and `print-project` windows are Vite-bundled into `src/build/`.
- Entry points: `src/js/windows/language-preferences/window.js` and `src/js/windows/print-project/window.js`.

## Testing

```bash
npm test              # runs all tests via scripts/run-tests.js (cross-platform)
npm run clean:fixtures # reset test fixtures to committed state
```

- `scripts/run-tests.js` discovers tests by file suffix and runs them in three batches:
  - `*.test.js` (plain) → **mocha** (unit tests)
  - `*.renderer.test.js` → **electron-mocha --renderer** (renderer process)
  - `*.main.test.js` → **electron-mocha** (main process)
- Test fixtures: `test/fixtures/` (`.storyboarder` files).

## Lint

```bash
npm run lint         # eslint src/js/
```

- ESLint v9 flat config (`eslint.config.js`), Babel parser, `@eslint/js` recommended rules.
- No TypeScript, no formatting tool.

## Architecture

```
src/js/main.js                          → Electron main process entry
src/js/window/main-window.js            → Main renderer (React + Redux + Canvas)
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
