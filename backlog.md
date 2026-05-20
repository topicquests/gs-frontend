# Project Backlog

## Code Review Findings

- [ ] [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.

### vite.config.ts
- [ ] Remove the triple-slash reference directive and use proper vite-env.d.ts augmentation instead (current workaround is temporary)
- [ ] Consider using `loadEnv` if env handling needs to expand

### src/vite-env.d.ts
- [ ] Add proper type imports from `@types/react` for `UserConfig` and `UserConfigFn` types
- [ ] Move this file or create separate type declaration files for better organization

### src/App.tsx
- [x] Remove unused import `Lightbulb` from lucide-react (Share2 and Award are used)
- [ ] The admin notice area shows hardcoded "12 Online" - should come from state
- [ ] TabButton component can be extracted to its own file
- [ ] Consider extracting localStorage logic into a custom hook (useLocalStorage)

### src/types.ts
- [x] Remove unused `Link` interface (not used anywhere)
- [x] Remove unused `DiscourseData` interface (not used anywhere)

### src/lib/utils.ts
- [ ] Consider renaming `cn` to something more descriptive

### src/components/IdeateTab.tsx
- [ ] Consider using custom hooks for AI interaction logic
- [x] Fix inconsistent indentation (mixed tabs/spaces in some sections)

### src/components/ArgdownRenderer.tsx
- [ ] Add proper CSS for argdown styling (prose classes may not cover all cases)
- [ ] The `argdown` import might need to be dynamically imported for bundle optimization
- [ ] Add proper error boundary around renderer

### src/services/llmService.ts
- [x] The API key "ollama" is now configurable via VITE_OPENAI_API_KEY
- [x] The system prompt strings have trailing spaces that should be trimmed
- [x] Add proper error type handling instead of `any`
- [x] Remove unused variables: `openaiHost`, `open600Model`
- [ ] Consider moving environment variable logging to a debug mode
- [ ] The prompts are too long - should be in separate prompt templates or a prompts file
- [ ] Add request/response logging with proper formatting

## Phase 1: Stability & Foundation
- [x] Replaced D3 DiscourseGraph with Argdown Visualization
- [x] Fixed vite.config.ts import errors using vite-env.d.ts type augmentation
- [x] Removed unused d3 dependency
- [x] Implemented localStorage persistence
- [x] All TypeScript compilation passes successfully
- [ ] Add Argdown syntax validation and sanitization layer

## Phase 2: Feature Expansion
- [x] Show loading skeleton when graph data arrives (Ref: `rendering-usetransition-loading`)
- [x] Show reasoning as collapsible sections (Ref: `rendering-conditional-render`)
- [ ] Implement Contributions tab content
- [ ] Implement "Collaborative Graph" view (multi-user simulation)
- [ ] Add keyboard shortcuts
- [ ] Improve grammatical placeholder text
- [ ] Make graph responsive for mobile

## Phase 3: Polish & Quality
- [x] Fix vite.config.ts import errors (loadEnv, defineConfig)
- [x] Remove unused d3 dependency (Ref: `bundle-size-optimization`)
- [ ] Add dark mode toggle
- [ ] Enhance graph interactivity (zooming, panning, clicking nodes)
- [ ] Accessibility audit
- [ ] Include unit tests for UI components and services
- [ ] Document new env vars and UI changes in README
- [ ] Clean up unused imports & dead code (Ref: `bundle-barrel-imports`)

## Phase 4: Nice-to-Have Features
- [ ] Implement importing/exporting discourse graphs
- [ ] Implement real-time collaboration features
- [ ] Add user authentication for persistence
