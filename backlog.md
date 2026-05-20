# Project Backlog

## Code Review Findings

### vite.config.ts
- [ ] Remove the triple-slash reference directive and use proper vite-env.d.ts augmentation instead (current workaround is temporary)
- [ ] Consider using `loadEnv` if env handling needs to expand

### src/vite-env.d.ts
- [ ] Add proper type imports from `@types/react` for `UserConfig` and `UserConfigFn` types
- [ ] Move this file or create separate type declaration files for better organization

### src/App.tsx
- [ ] Remove unused imports: `Lightbulb`, `Share2`, `Award` from lucide-react (declared but not used)
- [ ] The admin notice area shows hardcoded "12 Online" - should come from state
- [ ] TabButton component can be extracted to its own file
- [ ] Consider extracting localStorage logic into a custom hook (useLocalStorage)

### src/types.ts
- [ ] Remove unused `Link` interface (not used anywhere)
- [ ] Remove unused `DiscourseData` interface (not used anywhere)

### src/lib/utils.ts
- [ ] Consider renaming `cn` to something more descriptive or add JSDoc

### src/components/IdeateTab.tsx
- [ ] Remove console.log statements from production code
- [ ] Consider using custom hooks for AI interaction logic
- [ ] Fix inconsistent indentation (mixed tabs/spaces in some sections)

### src/components/ArgdownRenderer.tsx
- [ ] Add proper CSS for argdown styling (prose classes may not cover all cases)
- [ ] The `argdown` import might need to be dynamically imported for bundle optimization
- [ ] Add proper error boundary around renderer

### src/services/llmService.ts
- [ ] Remove all console.log statements (should use proper logging or be environment-controlled)
- [ ] The API key "ollama" is hardcoded - should be configurable
- [ ] The system prompt strings have trailing spaces that should be trimmed
- [ ] Add proper error type handling instead of `any`
- [ ] Remove unused variables: `openaiHost`, `openaiModel`, `openaiModel`
- [ ] Consider moving environment variable logging to a debug mode
- [ ] The prompts are too long - should be in separate prompt templates or a prompts file
- [ ] Add request/response logging with proper formatting

### backlog.md Cleanup
- [ ] Remove duplicate entries in Phase 4 (items 1-4 are duplicates)
- [ ] Clean up duplicate feature entries: "real-time collaboration", "user authentication", "importing/exporting"

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

## Recently Completed
- [x] **Code Review & Cleanup** - Fixed all type checking issues, removed unused dependencies
- [x] **localStorage Implementation** - Ideas and graphs now persist between sessions
- [x] **Vite Configuration** - Fixed TypeScript compatibility issues
- [x] **Dependency Optimization** - Removed unused d3 library, reducing bundle size
- [x] **Type Checking** - All TypeScript compilation passes successfully
