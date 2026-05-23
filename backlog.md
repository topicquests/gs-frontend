# Project Backlog

### Phase 1: Stability & Foundation (High Priority)
- [x] Remove unused `Link` interface from `types.ts`
- [x] Remove unused `DiscourseData` interface from `types.ts`
- [x] The API key "ollama" is now configurable via `VITE_OPENAI_API_KEY`
- [x] Add proper error type handling instead of `any` in `llmService.ts`
- [x] Remove unused variables: `openaiHost`, `openaiModel` in `llmService.ts`
- [x] Remove unused import `Lightbulb` from `App.tsx`
- [x] Replaced D3 DiscourseGraph with Argdown Visualization
- [x] Fixed vite.config.ts import errors using vite-env.d.ts type augmentation
- [x] Removed unused d3 dependency
- [x] Implemented localStorage persistence
- [x] All TypeScript compilation passes successfully
- [x] Add Argdown syntax validation and sanitization layer
- [x] Use dynamic import() to code-split the application (IdeateTab lazy-loaded)
- [x] Added manualChunks config in vite.config.ts for vendor optimization
- [x] Configured ESLint with flat config
- [x] Added unit tests for all components and services
- [x] Added comments to all TypeScript files

#### Tailwind CSS Migration (High Priority)
- [ ] Update dark variant syntax in src/index.css: @custom-variant dark → @variant dark
- [ ] Create tailwind.config.js with semantic color definitions and font family extensions
- [ ] Add @config directive in src/index.css to import the config file
- [ ] Review and update all Tailwind v4 configuration options
- [ ] Test dark mode implementation after updates
- [ ] Verify responsive design across all breakpoints
- [ ] Perform build and lint checks to ensure compatibility
- [ ] Document the new Tailwind configuration and usage patterns

### Phase 2: Feature Expansion (Medium Priority)
- [x] The admin notice area shows hardcoded "12 Online" - should come from state
- [x] TabButton component can be extracted to its own file
- [x] Consider extracting localStorage logic into a custom hook (useLocalStorage)
- [x] Consider using custom hooks for AI interaction logic in `IdeateTab.tsx`
- [x] The prompts are too long - should be in separate prompt templates or a prompts file
- [x] Add request/response logging with proper formatting in `llmService.ts`
- [x] Show loading skeleton when graph data arrives (Ref: `rendering-usetransition-loading`)
- [x] Show reasoning as collapsible sections (Ref: `rendering-conditional-render`)
- [ ] Implement Contributions tab content
- [ ] Implement "Collaborative Graph" view (multi-user simulation)
- [ ] Add keyboard shortcuts
- [ ] Improve grammatical placeholder text
- [ ] Make graph responsive for mobile
- [ ] [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.

### Phase 3: Polish & Quality (Low Priority)
- [x] Fix inconsistent indentation in `IdeateTab.tsx`
- [x] Fix trailing spaces in system prompt strings
- [x] Consider renaming `cn` to something more descriptive in `utils.ts`
- [x] Consider using `loadEnv` if env handling needs to expand
- [x] Add proper type imports from `@types/react` for `UserConfig` and `UserConfigFn` types
- [x] Move vite-env.d.ts or create separate type declaration files for better organization
- [x] Remove the triple-slash reference directive and use proper vite-env.d.ts augmentation
- [x] Add proper CSS for argdown styling in `ArgdownRenderer.tsx`
- [ ] The `argdown` import might need to be dynamically imported for bundle optimization
- [ ] Add proper error boundary around `ArgdownRenderer.tsx` renderer
- [x] Fix vite.config.ts import errors (loadEnv, defineConfig)
- [x] Remove unused d3 dependency (Ref: `bundle-size-optimization`)
- [ ] Add dark mode toggle
- [ ] Enhance graph interactivity (zooming, panning, clicking nodes)
- [ ] Accessibility audit
- [x] Include unit tests for UI components and services
- [ ] Document new env vars and UI changes in README
- [ ] Clean up unused imports & dead code (Ref: `bundle-barrel-imports`)

### Phase 4: Nice-to-Have Features
- [ ] Implement importing/exporting discourse graphs
- [ ] Implement real-time collaboration features
- [ ] Add user authentication for persistence

### Phase 5: Future Considerations
- [ ] Update `src/services/llmService.ts` to use a web-server to proxy requests to LLM provider
  - Remove direct OpenAI import
  - Import `socket.io-client`
  - Connect to server on mount
  - Emit `llm_request` with the prompt, await `llm_response`
- [ ] Update frontend to use new `llmService` and wait for completion

### Unit Tests
- [x] App.tsx - Test tab switching, renders correctly
- [x] components/TabButton.tsx - Test active/inactive states, click handler
- [x] components/IdeateTab.tsx - Test AI interaction, loading states, error handling
- [x] components/ArgdownRenderer.tsx - Test argdown rendering
- [x] hooks/useLocalStorage.ts - Test read/write operations
- [x] hooks/useAI.ts - Test ideate/submit functionality
- [x] services/llmService.ts - Test prompt generation (mocked API)
- [x] lib/utils.ts - Test clsxMerge function
